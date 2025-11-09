"use client";

import { useRouter } from "next/navigation";
import useGetAllProjects from "@/hooks/project/useGetAllProjects";
import DateFormater from "@/utils/DateFormater";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import useGetAllProposals from "@/hooks/prposal/useGetAllProposals";

interface project {
  _id: string;
  title: string;
  description: string;
  budget: number;
  category: { title: string };
  deadline: string;
  status: string;
}

const ProjectsTable: React.FC = () => {
  const router = useRouter();

  const {
    projects,
    isLoadingProjects,
  }: { projects: project[]; isLoadingProjects: boolean } = useGetAllProjects();

  const { proposals } = useGetAllProposals();

  if (isLoadingProjects) {
    return (
      <div className="flex justify-center items-center gap-4 h-full">
        <h1 className="font-bold text-primary text-xl">در حال بارگذاری...</h1>
        <ArrowPathIcon className="size-6 text-primary animate-spin" />
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-full">
        <h1 className="font-bold text-primary text-xl">پروژه‌ای وجود ندارد</h1>
      </div>
    );
  }

  return (
    <div className="gap-4 grid grid-rows-[auto_1fr]">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>عنوان</th>
              <th>توضیحات</th>
              <th>بودجه</th>
              <th>دسته بندی</th>
              <th>ددلاین</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: project) => {
              const hasSent = proposals?.some(
                (p: { project: { _id: string } }) =>
                  p.project?._id === project._id
              );
              return (
                <tr key={project._id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{project.budget?.toLocaleString("fa-IR")} تومان</td>
                  <td>{project.category ? project.category.title : "-"}</td>
                  <td>{DateFormater(project.deadline)}</td>
                  <td>{project.status === "OPEN" ? "باز" : "بسته"}</td>
                  <td>
                    <button
                      onClick={() => {
                        router.push(`/freelancer/proposals/${project._id}/new`);
                      }}
                      disabled={hasSent}
                      className="btn btn-primary"
                    >
                      {hasSent ? "ارسال شده" : "ارسال درخواست"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;
