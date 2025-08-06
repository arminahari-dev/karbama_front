"use client";

import EditModal from "@/components/ui/modal/EditModal ";
import useChangeFreelancerProposalStatus from "@/hooks/prposal/useChangeFreelancerProposalStatus";
import useGetFreelancerProposalsByProject from "@/hooks/prposal/useGetFreelancerProposalsByProject";
import { useParams } from "next/navigation";
import { useState } from "react";

interface proposal {
  _id: string;
  description: string;
  duration: string;
  price: number;
  status: string;
}

const ProposalsTable: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [status, setStatus] = useState<string>("");

  const [selectedProposalId, setSelectedProposalId] = useState<string>("");

  const { id } = useParams();

  const { proposals } = useGetFreelancerProposalsByProject(id as string);

  const { changeProposalStatus } = useChangeFreelancerProposalStatus();

  function handleOpenModal(id: string) {
    setSelectedProposalId(id);
    setOpenModal(true);
  }

  function handleConfirm() {
    changeProposalStatus({
      id: selectedProposalId,
      proposalStatus: Number(status),
    });
    setOpenModal(false);
  }

  if (!proposals || proposals.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-full">
        <h1 className="font-bold text-primary text-xl">درخواستی وجود ندارد</h1>
      </div>
    );
  }

  return (
    <>
      <div className="h-max overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>توضیحات</th>
              <th>مدت زمان</th>
              <th>مبلغ انجام کار</th>
              <th>وضعیت</th>
              <th>عملیات</th>
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
                <td>
                  <button
                    onClick={() => {
                      handleOpenModal(proposal?._id);
                    }}
                  >
                    تغییر وضعیت درخواست
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {openModal && (
        <EditModal
          content="وضعیت پروژه را انتخاب کنید"
          onConfirm={handleConfirm}
          onCancel={() => setOpenModal(false)}
          InputElement={
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-background !px-4 !py-2 border-none rounded-lg outline-none"
            >
              <option>-</option>
              <option value="2">تایید شده</option>
              <option value="0">رد شده</option>
            </select>
          }
        />
      )}
    </>
  );
};

export default ProposalsTable;
