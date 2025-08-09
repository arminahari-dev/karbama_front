"use client";

import Skeleton from "@/components/ui/skeleton/Skeleton ";
import useGetOwnerProjects from "@/hooks/project/useGetOwnerProjects";
import { Square3Stack3DIcon, SquaresPlusIcon } from "@heroicons/react/24/solid";

interface Proposal {
  _id: string;
}

interface ProposalsItem {
  proposals: Proposal[];
}

const OwnerDashboard: React.FC = () => {
  const { projects, isLoadingProjects } = useGetOwnerProjects();

  const numOfProjects = projects?.length;

  const numOfProposals = projects?.reduce(
    (acc: number, project: ProposalsItem) =>
      acc + (project?.proposals?.length || 0),
    0
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start gap-2">
        <h1 className="font-bold text-text text-2xl">آمار کلی</h1>
        <p className="text-muted text-right">
          اینجا می‌توانید اطلاعات و آمار مربوط به پروژه‌های خود را مشاهده کنید.
        </p>
      </div>
      <div className="gap-4 grid !grid-cols-2 max-tablet:!grid-cols-1">
        <div className="flex flex-row justify-between items-center bg-foreground !px-6 !py-4 border border-border rounded-lg text-text">
          <div className="flex flex-col items-center gap-2 text-2xl">
            <span>پروژه ها</span>
            {isLoadingProjects ? (
              <Skeleton width="2rem" height="2rem" />
            ) : (
              <span className="font-bold">
                {numOfProjects ? numOfProjects : 0}
              </span>
            )}
          </div>
          <div>
            <SquaresPlusIcon className="size-18" />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center bg-foreground !px-6 !py-4 border border-border rounded-lg text-text">
          <div className="flex flex-col items-center gap-2 text-2xl">
            <span>درخواست ها</span>
            {isLoadingProjects ? (
              <Skeleton width="2rem" height="2rem" />
            ) : (
              <span className="font-bold">
                {numOfProposals ? numOfProposals : 0}
              </span>
            )}
          </div>
          <div>
            <Square3Stack3DIcon className="size-18" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
