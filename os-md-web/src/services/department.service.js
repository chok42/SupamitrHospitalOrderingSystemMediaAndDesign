import axios from "axios";
import { departmentService } from "../helpers/contents";

export const GetListDepartmentService = async () => {
  try {
    const body = JSON.stringify({ action: "getlist" });
    const resp = await axios.post(departmentService.DEPERTMENT_URL, body);
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

export const GetByIdDepartmentService = async (id) => {
  try {
    const body = JSON.stringify({ action: "getbyid", id});
    const resp = await axios.post(departmentService.DEPERTMENT_URL, body);
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




