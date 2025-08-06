"use client";

import useGetAllProposals from "@/hooks/prposal/useGetAllProposals";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

interface proposal {
  _id: string;
  description: string;
  price: number;
  duration: string;
  status: string;
}

const ProposalsTable: React.FC = () => {
  const {
    proposals,
    isLoadingPropsals,
  }: {
    proposals: proposal[];

    isLoadingPropsals: boolean;
  } = useGetAllProposals();

  if (isLoadingPropsals) {
    return (
      <div className="flex justify-center items-center gap-4 h-full">
        <h1 className="font-bold text-primary text-xl">در حال بارگذاری</h1>
        <ArrowPathIcon className="size-6 text-primary animate-spin" />
      </div>
    );
  }

  if (!proposals || proposals.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-full">
        <h1 className="font-bold text-primary text-xl">
          درخواستی ای وجود ندارد
        </h1>
      </div>
    );
  }

  return (
    <div className="h-max overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>توضیحات</th>
            <th>مدت زمان</th>
            <th>مبلغ انجام کار</th>
            <th>وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal: proposal) => (
            <tr key={proposal?._id}>
              <td>{proposal?.description}</td>
              <td>{proposal?.duration} روز</td>
              <td>{proposal?.price.toLocaleString("fa-IR")} تومان</td>
              <td>
                {proposal?.status == "1"
                  ? "در انتظار تایید"
                  : proposal?.status == "0"
                  ? "رد شده"
                  : "تایید شده"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProposalsTable;
