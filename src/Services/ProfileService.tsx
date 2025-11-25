import axios from "axios";

const base_url = "http://localhost:8080/profiles/";

export const getAllProfiles = async () => {
  return axios
    .get(`${base_url}all`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getProfile = async (id: number) => {
  return axios
    .get(`${base_url}get/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const updateProfile = async (profile: any) => {
  const id = profile.id;
  return axios
    .put(`${base_url}update/${id}`, profile)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const searchProfiles = async (filters: any) => {
  return axios
    .post(`${base_url}search`, filters)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

