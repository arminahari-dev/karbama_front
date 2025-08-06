import { authFetch } from "@/utils/authFetch";

interface CategorylData {
  title: string;
  englishTitle: string;
  description: string;
  type: string;
  parent?: string;
}

export const getAllCategories = async () => {
  const res = await authFetch("/category/list", {
    method: "GET",
  });
  return res.data.categories;
};

export const deleteCategory = async (id: string) => {
  const res = await authFetch(`/admin/category/remove/${id}`, {
    method: "DELETE",
  });
  return res.data.message;
};

export const GetCategoryById = async (id: string) => {
  const res = await authFetch(`/category/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data?.category;
};

export const AddNewCategory = async (categorylData: CategorylData) => {
  const res = await authFetch("/admin/category/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categorylData),
  });

  return res.data?.message;
};

export const EditCategory = async (id: string, categorylData: object) => {
  const res = await authFetch(`/admin/category/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categorylData),
  });

  return res.data?.message;
};
