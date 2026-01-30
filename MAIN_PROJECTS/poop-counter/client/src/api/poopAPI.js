import axios from "axios";

const API = import.meta.env.VITE_SERVER_API_URL;
console.log(API);

export const getAllUsers = async () => {
  const res = await axios.get(`${API}/users`);
  return res.data;
};

export const getAllPoopCount = async () => {
  const res = await axios.get(`${API}/`);
  return res.data;
};

export const getDailyPoopCount = async (user) => {
  const res = await axios.get(`${API}/${user}/daily`);
  return res.data;
};

export const getWeeklyPoopCount = async (user) => {
  const res = await axios.get(`${API}/${user}/weekly`);
  return res.data;
};

export const addPoopCount = async (user) => {
  const res = await axios.post(`${API}/${user}/add`);
  return res.data;
};
