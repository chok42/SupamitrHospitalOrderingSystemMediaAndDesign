import { useContext, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
//context
import MyContext from "@/context/MyContext";
//service

import { GetListEmployeeByRoleService } from "@/services/employee.service";
import { InsertJobService } from "@/services/job.service";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  Input,
  Button,
  Typography,
  PopoverHandler,
  Popover,
  PopoverContent,
  Textarea,
} from "@material-tailwind/react";
import { format, setDate } from "date-fns";
import { th } from "date-fns/locale";
import jobTypeData from "@/data/jobtype-data";
import { DayPicker } from "react-day-picker";

const jobSchema = Yup.object().shape({
  name: Yup.string().required("กรุณาระบุข้อมูล"),
  dateTime: Yup.string().required("กรุณาระบุข้อมูล"),
  jobTime: Yup.string().required("กรุณาระบุข้อมูล"),
});

export const JobInsert = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { dataEmp, loader, setLoader } = useContext(MyContext);
  const [fileUse, setFileUse] = useState();
  const [fileBase64, setFileBase64] = useState();
  const [fileShow, setFileShow] = useState();
  const [employees, setEmployees] = useState([]);

  useMemo(async () => {
    setLoader(true);
    const resEmp = await GetListEmployeeByRoleService("1");
    setLoader(false);
    if (resEmp) {
      setEmployees(resEmp);
    } else {
      setEmployees([]);
    }
  }, []);

  const onSubmitJob = async (value) => {
    setLoader(true);
    const newValue = {
      ...value,
      dateTime:
        `${format(value.dateTime, "dd/MM/yyyy")}, ${value.jobTime}` || "",
      file: fileBase64 ? fileBase64 : "",
      fileName: fileBase64 ? fileUse.name : "",
      mimeType: fileBase64 ? fileUse.type : "",
    };
    const resp = await InsertJobService(newValue);

    if (resp && resp.success) {
      navigate(-1);
    }
  };

  const handleUpload = async (file) => {
    const reader = new FileReader();
    setFileUse(file);
    setFileShow(null);
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      setFileBase64(base64);
      const url = URL.createObjectURL(file);
      setFileShow(url);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card shadow={true} className="px-8 py-20 mt-2 container mx-auto">
      <Typography variant="h5" color="blue-gray">
        แบบฟอร์มแจ้งงาน (Brief Form)
      </Typography>
      <Typography variant="small" className="text-gray-600 font-normal mt-1">
        กรุณากรอกข้อมูลให้ครบถ้วนเพื่อความรวดเร็ว
      </Typography>
      <Formik
        initialValues={{
          code: "",
          name: "",
          detail: "",
          dateTime: Date.now(),
          jobTime: "",
          creationDate: "",
          tarket: "",
          objective: "",
          mode_tone: "",
          mes_format: "",
          file: "",
          type_id: "",
          status_id: "S01",
          rec_id: "",
          rvw_name: "",
          emp_id: dataEmp ? dataEmp.id : "",
          emp_name: dataEmp ? dataEmp.firstname : "",
          dpm_id: dataEmp ? dataEmp.dpm_id ?? "" : "",
          pst_id: dataEmp ? dataEmp.pst_id ?? "" : "",
        }}
        validationSchema={jobSchema}
        onSubmit={(value) => onSubmitJob(value)}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col mt-8">
            {dataEmp && (
              <div className=" mb-6 w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  ผู้แจ้ง
                </Typography>

                {dataEmp && (
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="w-full bg-blue-gray-50 rounded-md p-2 placeholder:opacity-100 border-[0.5px] focus:border-[0.5px] focus:border-t-gray-900 border-t-gray-300"
                  >
                    {`รหัส: ${dataEmp.code || ""} ชื่อ: คุณ ${
                      dataEmp.firstname || ""
                    }`}
                  </Typography>
                )}
              </div>
            )}

            <div className="w-full bg-blue-gray-50 rounded-md p-2">
              <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                <div className="w-full">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    ผู้ตรวจสอบงาน (Reviewer)
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Supamitr"
                    className="rounded-md focus:border-[0.5px] appearance-none  !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="rvw_name"
                    value={values.rvw_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="w-full">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    ประเภทงาน
                  </Typography>
                  <select
                    className="w-full bg-transparent placeholder:text-blue-gray-400 text-blue-gray-700 text-sm border-[0.5px] border-blue-gray-200 rounded pl-3 pr-8 py-[11px] transition duration-300 normal-case focus:outline-none focus:border-blue-gray-400 hover:border-blue-gray-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                    name="type_id"
                    value={values.type_id}
                    onChange={(e) => setFieldValue("type_id", e.target.value)}
                    error={Boolean(
                      touched && touched.type_id && errors && errors.type_id
                    )}
                  >
                    <option value="">ประเภทงาน</option>
                    {jobTypeData.map(({ id, name }, index) => (
                      <option key={index} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium flex items-center"
              >
                <InformationCircleIcon className="w-8 h-8" />
                รายละเอียดงาน (Job Detail)
              </Typography>
              <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                <div className="w-full">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    หัวข้อชิ้นงาน
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="เช่น ออกแบบภาพ"
                    className="rounded-md focus:border-[0.5px] appearance-none  !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="name"
                    value={values.name || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="w-full">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    กำหนดส่ง
                  </Typography>
                  <div className="flex gap-2">
                    <Popover placement="bottom">
                      <PopoverHandler>
                        <Input
                          placeholder=""
                          size="lg"
                          className=" rounded-md focus:border-[0.5px] appearance-none  !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          onChange={() => null}
                          value={
                            values.dateTime
                              ? format(values.dateTime, "dd/MM/yyyy")
                              : format(Date.now(), "dd/MM/yyyy")
                          }
                        />
                      </PopoverHandler>
                      <PopoverContent>
                        <DayPicker
                          mode="single"
                          startMonth={Date.now()}
                          selected={values.dateTime}
                          onSelect={(date) => setFieldValue("dateTime", date)}
                          showOutsideDays
                          className="border-0"
                          classNames={{
                            caption:
                              "flex justify-center py-2 mb-4 relative items-center",
                            caption_label: "text-sm font-medium text-gray-900",
                            nav: "flex items-center",
                            nav_button:
                              "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                            nav_button_previous: "absolute left-1.5",
                            nav_button_next: "absolute right-1.5",
                            table: "w-full border-collapse",
                            head_row: "flex font-medium text-gray-900",
                            head_cell: "m-0.5 w-9 font-normal text-sm",
                            row: "flex w-full mt-2",
                            cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                            day: "h-9 w-9 p-0 font-normal",
                            day_range_end: "day-range-end",
                            day_selected:
                              "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                            day_today: "rounded-md bg-gray-200 text-gray-900",
                            day_outside:
                              "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                            day_disabled: "text-gray-500 opacity-50",
                            day_hidden: "invisible",
                          }}
                          components={{
                            IconLeft: ({ ...props }) => (
                              <ChevronLeftIcon
                                {...props}
                                className="h-4 w-4 stroke-2"
                              />
                            ),
                            IconRight: ({ ...props }) => (
                              <ChevronRightIcon
                                {...props}
                                className="h-4 w-4 stroke-2"
                              />
                            ),
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="time"
                      size="lg"
                      className="w-[120px] rounded-md focus:border-[0.5px] appearance-none  !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="jobTime"
                      value={values.jobTime || ""}
                      onChange={(e) => setFieldValue("jobTime", e.target.value)}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3 flex flex-col items-end gap-4 md:flex-row">
                <div className="w-full">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    วัตถุประสงค์ (ทำเพื่อ?)
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="เช่น กระตุ้นยอดขาย"
                    className="rounded-md focus:border-[0.5px] appearance-none  !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="objective"
                    value={values.objective || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="w-full">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    กลุ่มเป้าหมาย (ไครดู?)
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="เช่น ลูกค้าใหม่"
                    className="rounded-md focus:border-[0.5px] appearance-none  !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="tarket"
                    value={values.tarket || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="mb-3 flex flex-col items-end gap-4 md:flex-row">
                <div className="w-full">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    MODE & TONE
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="เช่น สนุกสนาน, ทางการ..."
                    className="rounded-md focus:border-[0.5px] appearance-none  !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="mode_tone"
                    value={values.mode_tone || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="w-full">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    KEY MESSAGE / FORMAT
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="ข้อความหลัก / ขนาดภาพ"
                    className="rounded-md focus:border-[0.5px] appearance-none  !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="mes_format"
                    value={values.mes_format || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  รายละเอียดเพิ่มเติม
                </Typography>
                <Textarea
                  className="rounded-md focus:border-[0.5px] appearance-none  !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="detail"
                  value={values.detail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="flex flex-col items-end gap-4 md:flex-row mt-2">
              <div className="w-full">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 bg-blue-gray-50 border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium"
                  >
                    <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm h">
                        <span className="font-medium text-xl">
                          แนบไฟล์ตัวอย่าง (Refference)
                        </span>{" "}
                      </p>

                      <p className="text-ปส">(ขนาดไฟล์สูงสุด 35MB)</p>
                    </div>

                    <input
                      // ref={fileInputRef}
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleUpload(e.target.files[0])}
                    />
                  </label>
                </div>
                {fileShow && (
                  <div className="py-4">
                    <h3 className="text-center text-3xl text-black pb-4">
                      ตัวอย่างไฟล์ {fileUse.name}
                    </h3>
                    <iframe
                      src={fileShow}
                      className="w-full h-[100vh]"
                      title="PDF Preview"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex justify-end gap-2">
              <Button
                disabled={loader}
                onClick={() => navigate(-1)}
                color="blue"
                className="mt-6"
              >
                ย้อนกลับ
              </Button>
              <Button
                disabled={loader}
                type="submit"
                className="mt-6 bg-[#44AA32]"
              >
                บันทึก
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default JobInsert;
