import axios from "axios";
import { jobService } from "../helpers/contents";

export const GetListJobService = async () => {
  try {
    const body = JSON.stringify({ action: "getlist" });
    const resp = await axios.post(jobService.JOB_URL, body);
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

export const GetByIdJobService = async (id) => {
  try {
    const body = JSON.stringify({ action: "getbyid", id});
    const resp = await axios.post(jobService.JOB_URL, body);
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

export const InsertJobService = async (formData) => {
  try {
    const body = JSON.stringify({ action: "insert", ...formData});
    const resp = await axios.post(jobService.JOB_URL, body);
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


export const UpdateJobService = async (formData) => {
  try {
    const body = JSON.stringify({ action: "update", ...formData});
    const resp = await axios.post(jobService.JOB_URL, body);
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

export const DeleteJobService = async (id) => {
  try {
    const body = JSON.stringify({ action: "delete", id});
    const resp = await axios.post(jobService.JOB_URL, body);
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




