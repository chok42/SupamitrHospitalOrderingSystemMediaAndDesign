

export const employeeService = {
  EMPLOYEE_URL: `https://script.google.com/macros/s/${import.meta.env.VITE_EMPLOYEE_BEARERTOKEN}/exec`,
};

export const jobService = {
  JOB_URL: `https://script.google.com/macros/s/${import.meta.env.VITE_JOB_BEARERTOKEN}/exec`,
};

export const roleService = {
  ROLE_URL: `https://script.google.com/macros/s/${import.meta.env.VITE_ROLE_BEARERTOKEN}/exec`,
};
export const departmentService = {
  DEPERTMENT_URL: `https://script.google.com/macros/s/${import.meta.env.VITE_DEPARTMENT_BEARERTOKEN}/exec`,
};
export const positionService = {
  POSITION_URL: `https://script.google.com/macros/s/${import.meta.env.VITE_POSITION_BEARERTOKEN}/exec`,
};

//
// export const customerService = {
//   GET_CUSTOMER_URL: "https://sheetdb.io/api/v1/9nzwd9rdhj0tg",
//   headers: { Authorization: `Bearer ${process.env.EXPO_PUBLIC_BEARERTOKEN}` },
//   // auth: {
//   //     username: process.env.EXPO_PUBLIC_BASICTOKEN_USERNAME,
//   //     password: process.env.EXPO_PUBLIC_BASICTOKEN_PASSWORD
//   //   },
//   CRUD_CUSTOMER_URL: "https://script.google.com/macros/s/AKfycby75UubNFVWcfqwjeJKroCKr5YoIw_1EmMx72GB5laT0IHAEZ7PnIOKg5HGGEZqef0R/exec",
// };

export const removeAllStorage = async () => {
  let keys = ["empId","empCode","empUsername"];
  keys.forEach((k) => localStorage.removeItem(k));
  return;
};

export const removeStorage = async (key) => {
  localStorage.removeItem(key);
  return;
};

// Local Storage
export const setStorage = (key, value) => localStorage.setItem(key, value);
export const getStorage = (key) => localStorage.getItem(key);
