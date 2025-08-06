import { authFetch } from "@/utils/authFetch";

interface ProposalData {
  description: string;
  price: string;
  duration: string;
  projectId: string;
}

export const GetAllProposals = async () => {
  const res = await authFetch("/proposal/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data?.proposals;
};

export const GetFreelancerProposalById = async (id: string) => {
  const res = await authFetch(`/proposal/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data?.proposal;
};

export const GetFreelancerProposalsByProject = async (id: string) => {
  const res = await authFetch(`/proposal/project/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data?.proposals;
};

export const AddnewFreelancerProposal = async (proposalData: ProposalData) => {
  const res = await authFetch("/proposal/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proposalData),
  });

  return res.data?.message;
};

export const EditFreelancerProposal = async (
  id: string,
  proposalData: object
) => {
  const res = await authFetch(`/proposal/edit/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proposalData),
  });

  return res.data?.message;
};

export const ChangeFreelancerProposalStatus = async (
  id: string,
  proposalStatus: number
) => {
  const res = await authFetch(`/proposal/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: proposalStatus,
    }),
  });

  return res.data?.message;
};

// export const CreateNewProject = async (projectData: ProjectData) => {
//   const res = await authFetch("/project/add", {
//     method: "POST",
//     body: JSON.stringify(projectData),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return res.data?.message;
// };

// export const DeleteProject = async (id: string) => {
//   const res = await authFetch(`/project/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return res.data?.message;
// };

// export const ChangeProjectStatus = async (id: string, status: object) => {
//   const res = await authFetch(`/project/${id}`, {
//     method: "PATCH",
//     body: JSON.stringify(status),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return res.data?.message;
// };

// export const GetOwnerProjectById = async (id: string) => {
//   const res = await authFetch(`/project/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return res.data?.project;
// };

// export const UpdateProject = async (id: string, projectData: ProjectData) => {
//   const res = await authFetch(`/project/update/${id}`, {
//     method: "PATCH",
//     body: JSON.stringify(projectData),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return res.data?.message;
// };
