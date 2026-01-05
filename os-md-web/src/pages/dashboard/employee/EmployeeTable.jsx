import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useContext, useEffect, useMemo, useState } from "react";
import { DeleteEmployeeService, GetListEmployeeService } from "@/services/employee.service";
import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import MyContext from "@/context/MyContext";
import Swal from "sweetalert2";

export function EmployeeTable() {
  const navigate = useNavigate();
  const {setLoader} = useContext(MyContext)
  const [employee, setEmployee] = useState([]);
  
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
                  "ตำแหน่ง",
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
                    role_name,
                    dpm_id,
                    dpm_name,
                    pst_id,
                    pst_name,
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
                          {picture ? (
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
                          )}
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
                          {dpm_name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {pst_name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {phone}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex gap-2">
                          <IconButton className="bg-yellow-700"    onClick={() => navigate("update",{state:id})}>
                            <PencilIcon className="w-5 text-white" />
                          </IconButton>
                          <IconButton onClick={async ()=> await deleteEmployee(id)} className="bg-red-700">
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
    </div>
  );
}

export default EmployeeTable;
