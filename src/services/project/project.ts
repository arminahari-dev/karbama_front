import { authFetch } from "@/utils/authFetch";

interface ProjectData {
  title: string;
  description: string;
  budget: string;
  category: string;
  deadline: string;
}

export const GetOwnerProjects = async () => {
  const res = await authFetch("/project/owner-projects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data?.projects;
};

export const GetAllProjects = async () => {
  const res = await authFetch("/project/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data?.projects;
};

export const CreateNewProject = async (projectData: ProjectData) => {
  const res = await authFetch("/project/add", {
    method: "POST",
    body: JSON.stringify(projectData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data?.message;
};

export const DeleteProject = async (id: string) => {
  const res = await authFetch(`/project/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data?.message;
};

export const ChangeProjectStatus = async (id: string, status: object) => {
  const res = await authFetch(`/project/${id}`, {
    method: "PATCH",
    body: JSON.stringify(status),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data?.message;
};

export const GetOwnerProjectById = async (id: string) => {
  const res = await authFetch(`/project/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data?.project;
};

export const UpdateProject = async (id: string, projectData: ProjectData) => {
  const res = await authFetch(`/project/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(projectData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data?.message;
};
