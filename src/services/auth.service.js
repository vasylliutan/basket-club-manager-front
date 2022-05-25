import axios from "axios";
import { API_BASE } from "./constants";

export const auth = async (dt) => {
  try {
    const data = await axios.post(`${API_BASE}/ClubManager/api/Auth`, dt);
    if (data.status === 200 || data.status === 201) {
      return data.data;
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return { success: false, error: "Something went wrong" };
  }
};
