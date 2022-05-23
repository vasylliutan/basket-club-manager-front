import axios from "axios";
import { API_BASE } from "./constants";

export const getLeagueList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/League/list`);
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
