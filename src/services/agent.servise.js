import axios from "axios";
import { API_BASE } from "./constants";

export const getAgentList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/Agent/list`);
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

export const createAgent = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/Agent`, data);
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

export const updateAgent = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/Agent/${id}`, data);
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

export const deleteAgent = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/Agent/${id}`);
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
