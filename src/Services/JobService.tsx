import axios from "axios";
const base_url = "http://localhost:8080/jobs/";

// 👉 Map Redux Keys → Backend Param Names
const normalizeFilters = (filters: any) => {
  if (!filters) return {};

  const params: any = {};

  if (filters?.role?.length)
    params.role = filters.role.map((r: string) => r.trim()).join(",");

  if (filters?.location?.length)
    params.location = filters.location.map((l: string) => l.trim()).join(",");

  if (filters?.experience?.length)
    params.experience = filters.experience.map((e: string) => e.trim()).join(",");

  if (filters.jobType?.length)
    params.jobType = filters.jobType.map((j: string) => j.trim()).join(",");

  if (filters.salary?.length === 2) {
    params.minSalary = filters.salary[0];
    params.maxSalary = filters.salary[1];
  }

  params.jobStatus = "ACTIVE";

  return params;
};

const postJob = async (job: any) => {
  return axios.post(`${base_url}post`, job).then((res) => res.data);
};

const getAllJobs = async (filters: any = {}) => {
  try {
    const params: any = {};

    if (filters?.Role?.length)
      params.role = filters.Role.join(",");

    if (filters?.Location?.length)
      params.location = filters.Location.join(",");

    if (filters?.Experience?.length)
      params.experience = filters.Experience.join(",");

    if (filters?.["Job Type"]?.length)
      params.jobType = filters["Job Type"].join(",");

    if (filters?.Salary?.length === 2) {
      params.minSalary = filters.Salary[0];
      params.maxSalary = filters.Salary[1];
    }

    params.jobStatus = "ACTIVE";

    const query = new URLSearchParams(params).toString();
    const url = `http://localhost:8080/jobs/filter?${query}`;

    console.log("API →", url);

    const response = await fetch(url);
    if (!response.ok) throw new Error("API Error");
    return await response.json();

  } catch (err) {
    console.error("Error fetching filtered jobs:", err);
    return [];
  }
};


const getJob = async (id: any) => {
  return axios.get(`${base_url}get/${id}`).then((res) => res.data);
};

const applyJob = async (id: any, applicant: any) => {
  return axios.post(`${base_url}apply/${id}`, applicant).then((res) => res.data);
};

const getJobPostedBy = async (id: any) => {
  return axios.get(`${base_url}postedBy/${id}`).then((res) => res.data);
};

const changeAppStatus = async (application: any) => {
  return axios.post(`${base_url}changeAppStatus`, application).then((res) => res.data);
};

export { postJob, getAllJobs, getJob, applyJob, getJobPostedBy, changeAppStatus };
