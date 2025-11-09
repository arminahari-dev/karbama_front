"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "@/components/ui/modal/ConfirmModal";
import useChangeProjectStatus from "@/hooks/project/useChangeProjectStatus";
import useDeleteProject from "@/hooks/project/useDeleteProject";
import useGetOwnerProjects from "@/hooks/project/useGetOwnerProjects";
import DateFormater from "@/utils/DateFormater";
import {
  ArrowPathIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

interface project {
  _id: string;
  title: string;
  description: string;
  budget: number;
  category: { title: string };
  deadline: string;
  freelancer: {
    name: string;
  } | null;
  status: string;
}

const ProjectsTable: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string>("");

  const {
    projects,
    isLoadingProjects,
  }: {
    projects: project[];
    isLoadingProjects: boolean;
  } = useGetOwnerProjects();

  const { deleteProject } = useDeleteProject();

  const { changeProjectStatus } = useChangeProjectStatus();

  const router = useRouter();

  function handleOpenModal(id: string, title: string) {
    setOpenModal(true);
    setSelectedProjectId(id);
    setSelectedProjectTitle(title);
  }

  function handleConfirm() {
    deleteProject(selectedProjectId);
    setOpenModal(false);
  }

  function handleChangeProjectStatus(id: string, status: object) {
    changeProjectStatus({ id, status });
  }

  if (isLoadingProjects) {
    return (
      <div className="flex justify-center items-center gap-4 h-full">
        <h1 className="font-bold text-primary text-xl">در حال بارگذاری</h1>
        <ArrowPathIcon className="size-6 text-primary animate-spin" />
      </div>
    );
  }

  if (!projects || projects?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-full">
        <h1 className="font-bold text-primary text-xl">پروژه ای وجود ندارد</h1>
        <button
          onClick={() => {
            router.push("/owner/projects/new");
          }}
        >
          ساخت اولین پروژه
        </button>
      </div>
    );
  }

  return (
    <>
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
                <th>فریلنسر</th>
                <th>وضعیت</th>
                <th>عملیات</th>
                <th>درخواست ها</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project: project) => (
                <tr key={project?._id}>
                  <td>{project.title}</td>
                  <td>{project?.description}</td>
                  <td>{project?.budget?.toLocaleString("fa-IR")} تومان</td>
                  <td>{project?.category ? project.category.title : "-"} </td>
                  <td> {DateFormater(project?.deadline)}</td>
                  <td>{project?.freelancer ? project.freelancer.name : "-"}</td>
                  <td>
                    <div className="flex flex-col gap-2">
                      <label className="switch">
                        <input
                          className="hidden"
                          type="checkbox"
                          checked={project.status === "OPEN"}
                          onChange={() =>
                            handleChangeProjectStatus(project._id, {
                              status:
                                project.status === "OPEN" ? "CLOSED" : "OPEN",
                            })
                          }
                        />
                        <span className="slider round"></span>
                      </label>
                      {project?.status === "OPEN" ? "باز" : "بسته"}
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-between items-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() =>
                            router.push(`/owner/projects/${project._id}/edit`)
                          }
                          className="text-blue-500"
                        >
                          <PencilIcon className="size-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleOpenModal(project?._id, project?.title)
                          }
                          className="text-red-500"
                        >
                          <TrashIcon className="size-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        router.push(`/owner/projects/${project._id}/proposals`);
                      }}
                    >
                      مشاهده درخواست ها
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-max">
          <Link className="text-blue-500 underline" href="/owner/projects/new">
            ایجاد پروژه جدید
          </Link>
        </div>
      </div>

      {openModal && (
        <ConfirmModal
          content={`آیا از حدف پروژه ${selectedProjectTitle} مطعمن هستید ؟`}
          onCancel={() => setOpenModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default ProjectsTable;
