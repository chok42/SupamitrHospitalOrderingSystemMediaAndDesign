import {
  Card,
  CardBody,
  Typography,
  Button,
  CardHeader,
  IconButton,
  Dialog,
  DialogBody,
  DialogFooter,
  Textarea,
  Chip,
} from "@material-tailwind/react";
import {
  DeleteJobService,
  GetListJobHistoryByIdService,
  GetListJobService,
  InsertJobHistoryService,
  UpdateJobStatusService,
} from "@/services/job.service";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowPathIcon,
  LinkIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import MyContext from "@/context/MyContext";
import Swal from "sweetalert2";
import { PrivateRoute } from "@/guard/PrivateRoute";
import { toThaiDateTimeString } from "@/helpers/format";
import { dpmData, jobStaEmp, jobStaManager, jsData } from "@/data";
import { JobHsitoryTimeline } from "./sections/JobHsitoryTimeline";
import { Form, Formik } from "formik";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { OSPagination } from "@/components/OSPagination";

export function JobTable() {
  const navigate = useNavigate();
  const { dataEmp, setLoader } = useContext(MyContext);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [jobs, setJobs] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1,
    data: [],
  });
  const [open, setOpen] = useState(false);
  const [itemJob, setItemJob] = useState();
  const [jobHistory, setJobHistory] = useState([]);

  useEffect(() => {
    fetchData();
  }, [page, pageSize,dataEmp]);


  const fetchData = async () => {
    setLoader(true);
    if (dataEmp && dataEmp.dpm_id) {
      const res = await GetListJobService(page, pageSize, dataEmp.dpm_id);
      if (res) {
        setJobs(res);
      } else {
        setJobs({ page: 1, pageSize: 10, total: 0, totalPages: 1 });
      }
      setLoader(false);
    }
  };



  const fetchDataHistory = async (id) => {
    setLoader(true);
    const res = await GetListJobHistoryByIdService(id);
    setLoader(false);
    if (res) {
      setJobHistory(res);
    } else {
      setJobHistory([]);
    }
  };

  const handleOpen = async (data) => {
    setItemJob(data);
    await fetchDataHistory(data.job_Id);
    setOpen(true);
  };

  const handleClose = () => {
    setItemJob(null);
    setOpen(false);
  };

  const onPageChange = async ({ selected }) => {
    setPage(selected + 1);
  };

  const handleChangePageSize = async (number) => {
    setPageSize(number);
  };

  
  const convertDriveIFrame = (url) => {

    if (url) {
      const fileId = url.match(/[-\w]{25,}/)[0];
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
    return ""; // or handle invalid format
  };

  const deleteJob = async (id) => {
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
        const resp = await DeleteJobService(id);
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

  const updateJobStatus = async (id, status_id, status_name, detail) => {
    handleClose();
    setLoader(true);
    const resp = await UpdateJobStatusService(id, status_id);
    if (resp && resp.success) {
      const resp2 = await InsertJobHistoryService({
        name: status_name,
        detail: detail,
        job_id: id,
      });

      if (resp2 && resp2.success) {
        await fetchData();
      }
    }
    setLoader(false);
  };

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12 min-h-[70vh]">
        <Card>
          <CardHeader
            variant="gradient"
            className="mb-8 p-6 flex justify-between items-center bg-[#FFFFFF]"
          >
            <Typography variant="h6" className="text-[#0057A1]">
              ข้อมูลการแจ้งงาน
            </Typography>

            <div className="flex justify-center items-center gap-4">
              <PrivateRoute
                role={(dataEmp && dataEmp.role_id) || ""}
                roles={["99", "2"]}
              >
                <Button
                  onClick={() => navigate("insert")}
                  className="flex justify-center items-center bg-[#0057A1]"
                >
                  <Typography
                    variant="h3"
                    className="text- text-sm text-[#FFFFFF]"
                  >
                    แจ้งงานใหม่
                  </Typography>
                </Button>
              </PrivateRoute>
              <IconButton color="green" onClick={async () => await fetchData()}>
                <ArrowPathIcon className="w-5 h-5" />
              </IconButton>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <PrivateRoute
              role={(dataEmp && dataEmp.role_id) || ""}
              roles={["1", "2"]}
            >
              <div className="flex flex-col gap-4 p-2">
                {jobs.data && jobs.data.length > 0 ? (
                  <>
                    {jobs.data.map((iJob, index) => (
                      <Card
                        key={index}
                        onClick={async () => await handleOpen(iJob)}
                      >
                        <CardBody className="grid grid-cols-2">
                          <div className="flex flex-row justify-start items-center gap-2">
                            <div>{/* <Avatar alt="5" /> */}</div>
                            <div className="flex flex-col">
                              <Typography variant="h6" color="black">
                                {iJob.job_Code}
                              </Typography>
                              <Typography variant="h6" color="gray">
                                {`หัวข้อ: ${iJob.job_Name}`}
                              </Typography>
                              {iJob.department_Id && (
                                <Typography variant="h6" color="gray">
                                  {`แผนก: ${iJob.code || ""} ${
                                    dpmData.find(
                                      (fd) =>
                                        fd.id === iJob.department_Id.toString()
                                    )?.name || ""
                                  } `}
                                </Typography>
                              )}
                              <Typography variant="h6" color="gray">
                                {toThaiDateTimeString(iJob.job_DateTime)}
                              </Typography>
                            </div>
                          </div>
                          <div className="flex justify-end items-center">
                            {iJob.jobStatus_Id &&
                              jsData.map((ijs, index) => {
                                if (ijs.id === iJob.jobStatus_Id) {
                                  return (
                                    <Chip
                                      key={index}
                                      value={ijs.name}
                                      color={ijs.color}
                                      className="w-fit h-fit"
                                    />
                                  );
                                }
                              })}
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                    <div>
                      <OSPagination
                        total={jobs.total}
                        pageCount={jobs.totalPages}
                        page={page}
                        pageSize={pageSize}
                        onPageChange={onPageChange}
                        handleChangePageSize={handleChangePageSize}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </PrivateRoute>
            <PrivateRoute
              role={(dataEmp && dataEmp.role_id) || ""}
              roles={["99"]}
            >
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {[
                      "รหัสงาน",
                      "หัวข้องาน",
                      "ชื่อผู้แจ้ง",
                      "ชื่อผู้ตรวจ",
                      "วันที่แจ้ง",
                      "สถานะ",
                      "",
                    ].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[16px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jobs &&
                    jobs.length > 0 &&
                    jobs.map(
                      (
                        {
                          job_Id,
                          job_Code,
                          job_Name,
                          employee_FirstName,
                          reviewer_FirstName,
                          job_CreationDate,
                        },
                        index
                      ) => {
                        const className = `py-3 px-5 ${
                          index === jobs.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={index}>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                {/* <Avatar src={img} alt={name} size="sm" /> */}
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  {job_Code}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-blue-gray-400"
                              >
                                {job_Name}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-blue-gray-600"
                              >
                                {employee_FirstName}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-blue-gray-600"
                              >
                                {reviewer_FirstName}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-blue-gray-600"
                              >
                                {reviewer_FirstName}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-blue-gray-600"
                              >
                                {job_CreationDate}
                              </Typography>
                            </td>

                            <td className={className}>
                              <div className="flex gap-2">
                                <IconButton
                                  className="bg-yellow-700"
                                  onClick={() =>
                                    navigate("update", { state: job_Id })
                                  }
                                >
                                  <PencilIcon className="w-5 text-white" />
                                </IconButton>
                                <IconButton
                                  onClick={async () => await deleteJob(job_Id)}
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
            </PrivateRoute>
          </CardBody>
        </Card>
      </div>
      <Dialog open={open} handler={handleClose} size="xl">
        <Formik
          initialValues={{
            id: itemJob ? itemJob.job_Id ?? "" : "",
            name: itemJob ? itemJob.job_Name ?? "" : "",
            detail: itemJob ? itemJob.job_Detail ?? "" : "",
            dateTime: itemJob
              ? format(itemJob.job_DateTime, "yyyy-MM-dd HH:mm", {
                  locale: th,
                }) ?? ""
              : "",
            countUpdate: "",
            target: itemJob ? itemJob.job_Target ?? "" : "",
            objective: itemJob ? itemJob.job_Objective ?? "" : "",
            mode_tone: itemJob ? itemJob.job_mt ?? "" : "",
            mes_format: itemJob ? itemJob.job_mf ?? "" : "",
            file: itemJob ? itemJob.job_file ?? "" : "",
            type_id: itemJob ? itemJob.jobType_Id ?? "" : "",
            status_id: itemJob ? itemJob.jobStatus_Id ?? "" : "",
            rec_id: itemJob ? itemJob.recipient_Id ?? "" : "",
            rvw_name: dataEmp ? dataEmp.reviewer_FirstName : "",
            emp_id: dataEmp ? dataEmp.employee_Id ?? "" : "",
            emp_name: dataEmp ? dataEmp.employee_FirstName : "",
            dpm_id: itemJob ? itemJob.department_Id ?? "" : "",
            pst_id: itemJob ? itemJob.position_Id ?? "" : "",
            history: "",
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <div className="flex flex-row justify-between p-4 ">
                <Typography className="text-[18px] font-bold">
                  {values.name || ""}
                </Typography>
                <IconButton
                  onClick={handleClose}
                  className="bg-white shadow-sm"
                >
                  <XMarkIcon className="w-8 h-8 text-red-500" />
                </IconButton>
              </div>

              <DialogBody className="max-h-[70vh] overflow-scroll">
                <div className="w-full grid grid-cols-2">
                  <div className="w-full">
                    <div className="grid grid-cols-2 bg-[#FAFAFA] p-2 rounded-md gap-2">
                      <div className="w-full">
                        <div>
                          <Typography className="text-[16px] font-normal text-blue-gray-700">
                            ผู้สั่งงาน
                          </Typography>
                          <Typography className="text-[16px] font-normal text-black">
                            {values.name || ""}
                          </Typography>
                        </div>
                        <div>
                          <Typography className="text-[16px] font-normal text-blue-gray-700">
                            ผู้ตรวจสอบงาน
                          </Typography>
                          <Typography className="text-[16px] font-normal text-black">
                            {values.vew_name || ""}
                          </Typography>
                        </div>
                      </div>
                      <div className=" w-full">
                        <div>
                          <Typography className="text-[16px] font-normal text-blue-gray-700">
                            แผนก
                          </Typography>
                          <Typography className="text-[16px] font-normal text-black">
                            {dpmData.find(
                              (fd) => fd.id === values.dpm_id.toString()
                            )?.name || ""}
                          </Typography>
                        </div>
                        <div>
                          <Typography className="text-[16px] font-normal text-blue-gray-700">
                            กำหนดส่ง
                          </Typography>
                          <Typography className="text-[16px] font-normal text-black">
                            {toThaiDateTimeString(values.dateTime)}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <Typography className="text-[16px] font-bold my-4 text-black">
                      รายละเอียด (ฺBRIEF)
                    </Typography>
                    <div className="bg-[#FAFAFA] pb-4">
                      <div className="grid grid-cols-2  p-2 rounded-md gap-2">
                        <div className="w-full flex flex-col gap-2">
                          <div className="border-[1px] border-gray-400 rounded-md p-2 bg-white">
                            <Typography className="text-[16px] font-normal text-blue-gray-700">
                              วัตถุประสงค์
                            </Typography>
                            <Typography className="text-[16px] font-normal text-black">
                              {values.objective || ""}
                            </Typography>
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                          <div className="border-[1px] border-gray-400 rounded-md p-2 bg-white">
                            <Typography className="text-[16px] font-normal text-blue-gray-700">
                              กลุ่มเป้าหมาย
                            </Typography>
                            <Typography className="text-[16px] font-normal text-black">
                              {values.target || ""}
                            </Typography>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2  p-2 rounded-md gap-2">
                        <div className="w-full flex flex-col gap-2">
                          <div className="border-[1px] border-gray-400 rounded-md p-2 bg-white">
                            <Typography className="text-[16px] font-normal text-blue-gray-700">
                              MODE / TONE
                            </Typography>
                            <Typography className="text-[16px] font-normal text-black">
                              {values.mode_tone || ""}
                            </Typography>
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                          <div className="border-[1px] border-gray-400 rounded-md p-2 bg-white">
                            <Typography className="text-[16px] font-normal text-blue-gray-700">
                              Key Message
                            </Typography>
                            <Typography className="text-[16px] font-normal text-black">
                              {values.mes_format || ""}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1  p-2 rounded-md ">
                        <div className="border-[1px] border-gray-400 rounded-md p-2 bg-white">
                          <Typography className="text-[16px] font-normal text-blue-gray-700">
                            รายละเอียดเพิ่มเติม
                          </Typography>
                          <Typography className="text-[16px] font-normal text-black">
                            {values.detail || ""}
                          </Typography>
                        </div>
                      </div>
                      {values.file && (
                        <div className="flex justify-end ">
                          <div className="flex gap-2">
                            <a
                              className="w-fit text-green-500"
                              href={values.file}
                              download="proposed_file_name"
                              target="_blank"
                            >
                              <IconButton color="green">
                                <LinkIcon className="w-5" />
                              </IconButton>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-6">
                    <Typography className="text-[18px] font-bold text-blue-gray-700 text-center">
                      ประวัติการดำเดินงาน
                    </Typography>
                    <div className="py-4 flex flex-col justify-between">
                      <JobHsitoryTimeline itemHistory={jobHistory} />
                      <PrivateRoute
                        role={values.status_id}
                        roles={["S01", "S02", "S03"]}
                      >
                        <div className="w-full max-h-[20vh] pt-4">
                          <Typography className="text-[16px] font-normal text-blue-gray-700">
                            ข้อความ
                          </Typography>
                          <Textarea
                            className="rounded-md focus:border-[0.5px] appearance-none  !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            labelProps={{
                              className:
                                "before:content-none after:content-none",
                            }}
                            name="history"
                            value={values.history}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </PrivateRoute>
                    </div>
                  </div>
                </div>
              </DialogBody>

              <DialogFooter className="flex flex-row gap-2">
                <PrivateRoute role={dataEmp && dataEmp.role_id} roles={["1"]}>
                  {jobStaManager
                    .filter((ft) => ft.status_id === values.status_id)
                    .map((item, index) => (
                      <Button
                        key={index}
                        type="button"
                        onClick={async () => {
                          await updateJobStatus(
                            values.id,
                            item.js_id,
                            item.name,
                            values.history
                          );
                        }}
                        variant="gradient"
                        color={item.color ? item.color : "gray"}
                      >
                        <span>{item.name}</span>
                      </Button>
                    ))}
                </PrivateRoute>
                <PrivateRoute role={dataEmp && dataEmp.role_id} roles={["2"]}>
                  {values.status_id === "S01" && (
                    <Button
                      type="button"
                      variant="gradient"
                      color={"yellow"}
                      onClick={() => navigate("update", { state: values.id })}
                    >
                      <span>แก้ไขข้อมูล</span>
                    </Button>
                  )}
                  {jobStaEmp.filter((ft)=> ft.js_id !== "S05").map((item, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant="gradient"
                      color={item.color ? item.color : "gray"}
                      onClick={async () => {
                        await updateJobStatus(
                          values.id,
                          item.js_id,
                          item.name,
                          values.history
                        );
                      }}
                    >
                      <span>{item.name}</span>
                    </Button>
                  ))}
                </PrivateRoute>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export default JobTable;
