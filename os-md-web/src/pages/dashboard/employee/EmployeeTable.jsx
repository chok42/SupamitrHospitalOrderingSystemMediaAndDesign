import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  IconButton,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  dpmData,
  pstData,
  roleData,
  staEmpData,
} from "@/data";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  DeleteEmployeeService,
  GetListEmployeeService,
  UpdateEmployeeStatusService,
} from "@/services/employee.service";
import {
  LightBulbIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import MyContext from "@/context/MyContext";
import Swal from "sweetalert2";
import { Form, Formik } from "formik";
import * as Yup from 'yup'

const updateStatusSchema = Yup.object().shape({
  id: Yup.string().required("ไม่พบไอดี"),
  role_id: Yup.string().required("กรุณาเลือกสิทธิ์การใช้งาน"),
  status_id: Yup.string().required("กรุณาเลือกสถานะ"),
});

export function EmployeeTable() {
  const navigate = useNavigate();
  const { setLoader } = useContext(MyContext);
  const [employee, setEmployee] = useState([]);

  const [open, setOpen] = useState(false);
  const [itemEmp, setItemEmp] = useState({ id: "", status_id: "",role_id:"" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoader(true);
    const resp = await GetListEmployeeService();
    setLoader(false);
    if (resp) {
      setEmployee(resp);
    } else {
      setEmployee([]);
    }
  };

  const convertDriveImage = (url) => {
    //ConvertDriveLinkToDirectImage
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
    if (match && match[1]) {
      const fileId = match[1];
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
    return ""; // or handle invalid format
  };

  const handleOpen = (id, status_id,role_id) => {
    setOpen(true);
    setItemEmp({ id, status_id,role_id });
  };

  const handleClose = () => {
    setOpen(false)
    setItemEmp({id:"", status_id:"" ,role_id:""})
  }

  const departmentData = (id) => {
    if (id) {
      const dpmName = dpmData.find((fd) => fd.id === id)?.name;
      if (dpmName) {
        return dpmName;
      }
    }
    return "";
  };

  const positionData = (id) => {
    if (id) {
      const pstName = pstData.find((fd) => fd.id === id)?.name;
      if (pstName) {
        return pstName;
      }
    }
    return "";
  };

  const rolData = (id) => {
    if (id) {
      const rolName = roleData.find((fd) => fd.id === id)?.name;
      if (rolName) {
        return rolName;
      }
    }
    return "";
  };

  const statusData = (id) => {
    if (id) {
      const sta = staEmpData.find((fd) => fd.id === id);
      if (sta) {
        return <LightBulbIcon color={sta?.color} className={`w-5 h-5 `} />;
      }
    }
    return null;
  };

  const deleteEmployee = async (id) => {
    await Swal.fire({
      title: "คุณแน่ใจเหรอ?",
      text: "คุณจะไม่สามารถย้อนกลับการเปลี่ยนแปลงนี้ได้!",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ออก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoader(true);
        const resp = await DeleteEmployeeService(id);
        setLoader(false);
        if (resp && resp.success) {
          Swal.fire({
            title: "สำเร็จ!",
            text: "ไฟล์ของคุณถูกลบแล้ว.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          await fetchData();
        }
      }
    });
  };

  const onSubmitUpdateStatus = async (val) => {
    handleClose()
    setLoader(true);
    
    const resp = await UpdateEmployeeStatusService(val);
    setLoader(false);
    if (resp && resp.success) {
      Swal.fire({
        title: "อัปเดตสถานะสำเร็จ",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      await fetchData();
    } else if (resp && resp.success === false && resp.status === "500") {
      console.log("msg:", resp.message);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 min-h-[75vh]">
      <Card>
        <CardHeader
          variant="gradient"
          className="mb-8 p-6 flex justify-between items-center bg-[#44AA32]"
        >
          <Typography variant="h6" color="white">
            ตารางพนักงาน
          </Typography>
          <Button
            onClick={() => navigate("insert")}
            className="flex justify-center items-center bg-[#FFFFFF]"
          >
            <PlusIcon className="w-5 text-[#0057A1]" />
            <Typography variant="h3" className="text- text-xs text-[#0057A1]">
              เพิ่มพนักงาน
            </Typography>
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "ชื่อผู้ใช้",
                  "ชื่อจริง",
                  "แผนก",
                  "สิทธิ์การใช้งาน",
                  "เบอร์โทรศัพท์",
                  "",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employee.map(
                (
                  {
                    id,
                    code,
                    username,
                    firstname,
                    lastname,
                    phone,
                    email,
                    picture,
                    role_id,
                    dpm_id,
                    pst_id,
                    status_id,
                  },
                  key
                ) => {
                  const className = `py-3 px-5 ${
                    key === employee.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;
                  return (
                    <tr key={key}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          {/* {picture ? (
                            <Avatar
                              src={convertDriveImage(picture)}
                              alt={username}
                              size="sm"
                              variant="rounded"
                            />
                          ) : (
                            <Avatar
                              src={"/img/logo/logo_spm_facebook.jpg"}
                              alt={username}
                              size="sm"
                              variant="rounded"
                            />
                          )} */}
                          <Avatar
                            src={"/img/logo/logo_spm_facebook.jpg"}
                            alt={username}
                            size="sm"
                            variant="rounded"
                          />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {username}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {`${firstname} ${lastname}`}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {departmentData(dpm_id)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {rolData(role_id)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <IconButton
                          color="white"
                          onClick={() => handleOpen(id, status_id,role_id)}
                        >
                          {statusData(status_id)}
                        </IconButton>
                      </td>
                      <td className={className}>
                        <div className="flex gap-2">
                          <IconButton
                            className="bg-yellow-700"
                            onClick={() => navigate("update", { state: id })}
                          >
                            <PencilIcon className="w-5 text-white" />
                          </IconButton>
                          <IconButton
                            onClick={async () => await deleteEmployee(id)}
                            className="bg-red-700"
                          >
                            <TrashIcon className="w-5 text-white" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Dialog
        open={open}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            id: itemEmp ? itemEmp.id ?? "" : "",
            status_id: itemEmp ? itemEmp.status_id ?? "" : "",
            role_id: itemEmp ? itemEmp.role_id ?? "" : "",
          }}
          validationSchema={updateStatusSchema}
          onSubmit={onSubmitUpdateStatus}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <DialogHeader>อัปเดตสถานะ และสิทธิ์การใช้งาน</DialogHeader>
              <DialogBody className="flex flex-col gap-2">
                <select
                  // size="lg"
                  className={`
                     w-full 
                     bg-transparent 
                   placeholder:text-blue-gray-400 
                   text-blue-gray-700 text-sm 
                     border-[0.5px] 
                     border-blue-gray-200 
                     rounded pl-3 pr-8 py-[11px] 
                     transition duration-300 normal-case 
                     focus:outline-none 
                     ${
                       touched &&
                       touched.status_id &&
                       errors &&
                       errors.status_id
                         ? "border-red-500 "
                         : "border-blue-gray-400"
                     }   
                     ${
                       touched &&
                       touched.status_id &&
                       errors &&
                       errors.status_id
                         ? "focus:border-red-500 "
                         : "focus:border-blue-gray-400"
                     }                                             
                    hover:border-blue-gray-400  
                      appearance-none cursor-pointer
                      `}
                  name="status_id"
                  value={values.status_id || ""}
                  onChange={(e) => {
                    setFieldValue("status_id", e.target.value);
                  }}
                  onBlur={handleBlur}
                >
                  <option value="">None</option>
                  {staEmpData.map((sta, index) => (
                    <option value={sta.id} key={index}>
                      {sta.title}
                    </option>
                  ))}
                </select>
                <select
                  // size="lg"
                  className={`
                     w-full 
                     bg-transparent 
                   placeholder:text-blue-gray-400 
                   text-blue-gray-700 text-sm 
                     border-[0.5px] 
                     border-blue-gray-200 
                     rounded pl-3 pr-8 py-[11px] 
                     transition duration-300 normal-case 
                     focus:outline-none 
                     ${
                       touched && touched.role_id && errors && errors.role_id
                         ? "border-red-500 "
                         : "border-blue-gray-400"
                     }   
                     ${
                       touched && touched.role_id && errors && errors.role_id
                         ? "focus:border-red-500 "
                         : "focus:border-blue-gray-400"
                     }                                             
                    hover:border-blue-gray-400  
                      appearance-none cursor-pointer
                      `}
                  name="role_id"
                  value={values.role_id || ""}
                  onChange={(e) => {
                    setFieldValue("role_id", e.target.value);
                  }}
                  onBlur={handleBlur}
                >
                  <option value="">None</option>
                  {roleData.map((rol, index) => (
                    <option value={rol.id} key={index}>
                      {rol.name}
                    </option>
                  ))}
                </select>
              </DialogBody>
              <DialogFooter>
                <Button variant="gradient" color="green" type="submit">
                  <span>ยืนยัน</span>
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

export default EmployeeTable;
