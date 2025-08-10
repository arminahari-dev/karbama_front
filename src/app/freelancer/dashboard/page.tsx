"use client";

import Skeleton from "@/components/ui/skeleton/Skeleton ";
import useGetAllProposals from "@/hooks/prposal/useGetAllProposals";
import { RectangleStackIcon, SquaresPlusIcon } from "@heroicons/react/24/solid";

interface ProposalItem {
  status: number;
}

const FreelancerDashboard: React.FC = () => {
  const { proposals, isLoadingPropsals } = useGetAllProposals();

  const numOfProposals = proposals?.length;

  // const numOfAcceptedProposals = proposals?.reduce(
  //   (acc: number, project: ProposalItem) =>
  //     acc + (project?.proposals?.length || 0),
  //   0
  // );

  const numOfAcceptedProposals =
    proposals?.reduce(
      (acc: number, project: ProposalItem) =>
        acc + (project.status === 2 ? 1 : 0),
      0
    ) ?? 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start gap-2">
        <h1 className="font-bold text-text text-2xl">آمار کلی</h1>
        <p className="text-secondary text-right">
          اینجا می‌توانید اطلاعات و آمار مربوط به درخواست های خود را مشاهده
          کنید.
        </p>
      </div>
      <div className="gap-4 grid !grid-cols-2 max-tablet:!grid-cols-1">
        <div className="flex flex-row justify-between items-center bg-foreground !px-6 !py-4 rounded-lg text-text">
          <div className="flex flex-col items-center gap-2 text-2xl">
            <span>درخواست ها</span>
            {isLoadingPropsals ? (
              <Skeleton width="2rem" height="2rem" />
            ) : (
              <span className="font-bold">
                {numOfProposals ? numOfProposals : 0}
              </span>
            )}
          </div>
          <div>
            <SquaresPlusIcon className="size-18" />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center bg-foreground !px-6 !py-4 rounded-lg text-text">
          <div className="flex flex-col items-center gap-2 text-2xl">
            <span>درخواست های تایید شده</span>
            {isLoadingPropsals ? (
              <Skeleton width="2rem" height="2rem" />
            ) : (
              <span className="font-bold">
                {numOfAcceptedProposals ? numOfAcceptedProposals : 0}
              </span>
            )}
          </div>
          <div>
            <RectangleStackIcon className="size-18" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
