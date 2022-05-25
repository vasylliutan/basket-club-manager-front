import axios from "axios";
import { API_BASE } from "./constants";

export const getTrainerContractList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/TrainerContract/list`);
    if (data.status === 200 || data.status === 201) {
      return data.data;
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createTrainerContract = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/TrainerContract`, data);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      throw new Error(res.statusText);
    }
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const updateTrainerContract = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/TrainerContract/${id}`, data);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      throw new Error(res.statusText);
    }
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const deleteTrainerContract = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/TrainerContract/${id}`);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      throw new Error(res.statusText);
    }
  } catch (e) {
    console.error(e);
    return {};
  }
};
