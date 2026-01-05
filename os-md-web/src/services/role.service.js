import axios from "axios";
import { roleService } from "../helpers/contents";

export const GetListRoleService = async () => {
  try {
    const body = JSON.stringify({ action: "getlist" });
    const resp = await axios.post(roleService.ROLE_URL, body);
    let json = await resp.data;
    if (json && json.success) {
      return json.data;
    }
    return null;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};

export const GetByIdRoleService = async (id) => {
  try {
    const body = JSON.stringify({ action: "getbyid", id});
    const resp = await axios.post(roleService.ROLE_URL, body);
    let json = await resp.data;
    if (json && json.data) {
      return json.data
    }
    return null;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};

