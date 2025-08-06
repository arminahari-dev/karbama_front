import upfetch from "../services/api/Api";

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: BodyInit;
  _retry?: boolean;
}

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];
let refreshPromise: Promise<void> | null = null;

const retryPendingRequests = () => {
  pendingRequests.forEach((cb) => cb());
  pendingRequests = [];
};

export const authFetch = async (url: string, options: FetchOptions = {}) => {
  try {
    const response = await upfetch(url, options);
    return response;
  } catch (err: unknown) {
    const status = (err as { response?: { status?: number } })?.response
      ?.status;
    const is401 = status === 401;

    if (is401 && !options._retry) {
      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = upfetch("/user/refresh-token", {
          method: "GET",
        })
          .then(() => {
            isRefreshing = false;
            retryPendingRequests();
          })
          .catch((refreshError) => {
            isRefreshing = false;
            window.location.href = "/auth";
            throw refreshError;
          });
      }

      return new Promise((resolve, reject) => {
        pendingRequests.push(async () => {
          try {
            await refreshPromise;
            const retryOptions = { ...options, _retry: true };
            const retryResponse = await upfetch(url, retryOptions);
            resolve(retryResponse.data.data);
          } catch (err) {
            reject(err);
          }
        });
      });
    }

    throw err;
  }
};
