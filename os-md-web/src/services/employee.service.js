import axios from "axios";
import { employeeService } from "../helpers/contents";

export const GetListEmployeeService = async () => {
  try {
    const body = JSON.stringify({ action: "getlist" });
    const resp = await axios.post(employeeService.EMPLOYEE_URL, body);
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

export const GetListEmployeeByRoleService = async (role_id) => {
  try {
    const body = JSON.stringify({ action: "getlistemployeebyrole",role_id });
    const resp = await axios.post(employeeService.EMPLOYEE_URL, body);
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

export const GetByIdEmployeeService = async (id) => {
  try {
    const body = JSON.stringify({ action: "getbyid", id});
    const resp = await axios.post(employeeService.EMPLOYEE_URL, body);
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



export const LoginEmployeeService = async ({ username, password }) => {
  try {
    const body = JSON.stringify({ action: "login", username, password });
    const resp = await axios.post(employeeService.EMPLOYEE_URL, body);
    let json = await resp.data;
    if (json && json.success) {
      const emp = json.data;
      return emp;
    }
    return null;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};

//code, username, password, firstname, lastname, phone, email, picture, role_id, role_name, dpm_id, dpm_name, pst_id, pst_name
export const InsertEmployeeService = async (formData) => {
  try {
    const body = JSON.stringify({ action: "insert", ...formData});
    const resp = await axios.post(employeeService.EMPLOYEE_URL, body);
    let json = await resp.data;
    if (json) {
      return json
    }
    return null;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};

//id, code, username, password, firstname, lastname, phone, email, picture, role_id, role_name, dpm_id, dpm_name, pst_id, pst_name }
export const UpdateEmployeeService = async (formData) => {
  try {
    const body = JSON.stringify({ action: "update", ...formData});
    const resp = await axios.post(employeeService.EMPLOYEE_URL, body);
    let json = await resp.data;
    if (json) {
      return json
    }
    return null;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};

export const UpdateEmployeeStatusService = async (val) => {
  try {
    const body = JSON.stringify({ action: "update_statusbyid",...val});
    const resp = await axios.post(employeeService.EMPLOYEE_URL, body);
    let json = await resp.data;
    if (json) {
      return json
    }
    return null;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};


export const DeleteEmployeeService = async (id) => {
  try {
    const body = JSON.stringify({ action: "delete", id});
    const resp = await axios.post(employeeService.EMPLOYEE_URL, body);
    let json = await resp.data;
    if (json) {
      return json
    }
    return null;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};




