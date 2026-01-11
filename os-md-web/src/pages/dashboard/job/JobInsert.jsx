import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
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
import { format } from "date-fns";
import jobTypeData from "@/data/jobtype-data";
import { DayPicker } from "react-day-picker";
import { DialogUploadFile } from "./sections/DialogUploadFIle";
//context
import MyContext from "@/context/MyContext";
//service
import { InsertJobService } from "@/services/job.service";


const jobSchema = Yup.object().shape({
  job_Name: Yup.string().required("กรุณาระบุข้อมูล"),
  job_DateTime: Yup.string().required("กรุณาระบุข้อมูล"),
  jobTime: Yup.string().required("กรุณาระบุข้อมูล"),
  job_Target: Yup.string().required("กรุณาระบุข้อมูล"),
  job_Objective: Yup.string().required("กรุณาระบุข้อมูล"),
  job_mt: Yup.string().required("กรุณาระบุข้อมูล"),
  job_mf: Yup.string().required("กรุณาระบุข้อมูล"),
  jobType_Id: Yup.string().required("กรุณาระบุข้อมูล"),
  jobStatus_Id: Yup.string().required("กรุณาระบุข้อมูล"),
  reviewer_FirstName: Yup.string().required("กรุณาระบุข้อมูล"),
  employee_Id: Yup.string().required("กรุณาระบุข้อมูล"),
  employee_FirstName: Yup.string().required("กรุณาระบุข้อมูล"),
  department_Id: Yup.string().required("กรุณาระบุข้อมูล"),
});

export const JobInsert = () => {
  const navigate = useNavigate();
  const { dataEmp, loader, setLoader } = useContext(MyContext);

  const onSubmitJob = async (value) => {
    setLoader(true);
    const newValue = {
      ...value,
      job_DateTime:
        `${format(value.job_DateTime, "dd/MM/yyyy")}, ${value.jobTime}` || "",
      job_file: value.fileBase64 ? value.fileBase64 : "",
      fileName: value.fileBase64 ? value.job_file.name : "",
      mimeType: value.fileBase64 ? value.job_file.type : "",
    };
    const resp = await InsertJobService(newValue);
    if (resp && resp.success) {
      navigate(-1);
    }
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
        enableReinitialize
        validationSchema={jobSchema}
        initialValues={{
          job_Code: "",
          job_Name: "",
          job_Detail: "",
          job_DateTime: Date.now(),
          jobTime: "",
          job_CreationDate: "",
          job_Target: "",
          job_Objective: "",
          job_mt: "",
          job_mf: "",
          job_file: "",
          jobType_Id: "",
          jobStatus_Id: "S01",
          recipient_Id: "",
          reviewer_FirstName: "",
          employee_Id: dataEmp ? dataEmp.id : "",
          employee_FirstName: dataEmp ? dataEmp.firstname : "",
          department_Id: dataEmp ? dataEmp.dpm_id ?? "" : "",
          position_Id: dataEmp ? dataEmp.position_Id ?? "" : "",
          fileShow: "",
          fileBase64: "",
          open: false,
        }}
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
        }) => {
          const handleUpload = async (file) => {
            const reader = new FileReader();
            setFieldValue("job_file", file);
            setFieldValue("fileBase64", "");
            setFieldValue("fileShow", "");
            reader.onloadend = async () => {
              const base64 = reader.result.split(",")[1];
              setFieldValue("fileBase64", base64);
              const url = URL.createObjectURL(file);
              setFieldValue("fileShow", url);
            };
            reader.readAsDataURL(file);
          };

          return (
            <Form onSubmit={handleSubmit} className="flex flex-col mt-8">
              {dataEmp && (
                <div className="mb-6 w-full">
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
                      className="w-full bg-[#FFFFFF]rounded-md p-2 placeholder:opacity-100 border-[0.5px] focus:border-[0.5px] focus:border-t-gray-900 border-t-gray-300"
                    >
                      {`ชื่อผู้แจ้ง: ${
                        dataEmp.firstname || ""
                      }`}
                    </Typography>
                  )}
                </div>
              )}

              <div className="w-full bg-[#FFFFFF]rounded-md p-2">
                <div className="mb-6 flex flex-col  gap-4 md:flex-row">
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      ผู้ตรวจสอบงาน (Reviewer){" "}
                      <span className="text-red-500">*</span>
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Supamitr"
                      className={`
                      rounded-md 
                      focus:border-[0.5px] 
                      appearance-none                   
                      ${
                        touched &&
                        touched.reviewer_FirstName &&
                        errors &&
                        errors.reviewer_FirstName
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 
                      placeholder:opacity-100 
                      ${
                        touched &&
                        touched.reviewer_FirstName &&
                        errors &&
                        errors.reviewer_FirstName
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      }                                
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none`}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="reviewer_FirstName"
                      value={values.reviewer_FirstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched &&
                          touched.reviewer_FirstName &&
                          errors &&
                          errors.reviewer_FirstName
                      )}
                    />
                    {touched &&
                      touched.reviewer_FirstName &&
                      errors &&
                      errors.reviewer_FirstName && (
                        <p className="font-normal text-red-500 text-[12px]">
                          {errors.reviewer_FirstName}
                        </p>
                      )}
                  </div>
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      ประเภทงาน <span className="text-red-500">*</span>
                    </Typography>
                    <select
                      className="w-full bg-transparent placeholder:text-blue-gray-400 text-blue-gray-700 text-sm border-[0.5px] border-blue-gray-200 rounded pl-3 pr-8 py-[11px] transition duration-300 normal-case focus:outline-none focus:border-blue-gray-400 hover:border-blue-gray-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                      name="jobType_Id"
                      value={values.jobType_Id}
                      onChange={(e) =>
                        setFieldValue("jobType_Id", e.target.value)
                      }
                    >
                      <option value="">ประเภทงาน</option>
                      {jobTypeData.map(({ id, name }, index) => (
                        <option key={index} value={id}>
                          {name}
                        </option>
                      ))}
                    </select>

                    {touched &&
                      touched.jobType_Id &&
                      errors &&
                      errors.jobType_Id && (
                        <p className="font-normal text-red-500 text-[12px]">
                          {errors.jobType_Id}
                        </p>
                      )}
                  </div>
                </div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-[18px] font-bold flex items-center"
                >
                  รายละเอียดงาน (Job Detail)
                </Typography>
                <div className="mb-6 flex flex-col  gap-4 md:flex-row">
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      หัวข้อชิ้นงาน <span className="text-red-500">*</span>
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="เช่น ออกแบบภาพ"
                      className={`
                      rounded-md 
                      focus:border-[0.5px] 
                      appearance-none                   
                      ${
                        touched && touched.job_Name && errors && errors.job_Name
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 
                      placeholder:opacity-100 
                      ${
                        touched && touched.job_Name && errors && errors.job_Name
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      }                                
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none`}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="job_Name"
                      value={values.job_Name || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched && touched.job_Name && errors && errors.job_Name
                      )}
                    />
                    {touched &&
                      touched.job_Name &&
                      errors &&
                      errors.job_Name && (
                        <p className="font-normal text-red-500 text-[12px]">
                          {errors.job_Name}
                        </p>
                      )}
                  </div>
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      กำหนดส่ง <span className="text-red-500">*</span>
                    </Typography>
                    <div className="flex gap-2">
                      <Popover placement="bottom">
                        <PopoverHandler>
                          <Input
                            placeholder=""
                            size="lg"
                            className={`
                      rounded-md 
                      focus:border-[0.5px] 
                      appearance-none                   
                      ${
                        touched &&
                        touched.job_DateTime &&
                        errors &&
                        errors.job_DateTime
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 
                      placeholder:opacity-100 
                      ${
                        touched &&
                        touched.job_DateTime &&
                        errors &&
                        errors.job_DateTime
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      }                                
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none`}
                            labelProps={{
                              className:
                                "before:content-none after:content-none",
                            }}
                            onChange={() => null}
                            value={
                              values.job_DateTime
                                ? format(values.job_DateTime, "dd/MM/yyyy")
                                : format(Date.now(), "dd/MM/yyyy")
                            }
                            error={Boolean(
                              touched &&
                                touched.job_DateTime &&
                                errors &&
                                errors.job_DateTime
                            )}
                          />
                        </PopoverHandler>
                        <PopoverContent>
                          <DayPicker
                            mode="single"
                            startMonth={Date.now()}
                            selected={values.job_DateTime}
                            onSelect={(date) =>
                              setFieldValue("job_DateTime", date)
                            }
                            showOutsideDays
                            className="border-0"
                            classNames={{
                              caption:
                                "flex justify-center py-2 mb-4 relative items-center",
                              caption_label:
                                "text-sm font-medium text-gray-900",
                              nav: "flex items-center",
                              nav_button:
                                "h-6 w-6 bg-transparent hover:bg-[#FFFFFF]p-1 rounded-md transition-colors duration-300",
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
                        className={`w-[130px]
                      rounded-md 
                      focus:border-[0.5px] 
                      appearance-none                   
                      ${
                        touched && touched.jobTime && errors && errors.jobTime
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 
                      placeholder:opacity-100 
                      ${
                        touched && touched.jobTime && errors && errors.jobTime
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      }                                
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none`}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        name="jobTime"
                        value={values.jobTime || ""}
                        onChange={(e) =>
                          setFieldValue("jobTime", e.target.value)
                        }
                        onBlur={handleBlur}
                        error={Boolean(
                          touched && touched.jobTime && errors && errors.jobTime
                        )}
                      />
                    </div>
                    {touched && touched.jobTime && errors && errors.jobTime && (
                      <p className="font-normal text-red-500 text-[12px]">
                        {errors.jobTime}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-3 flex flex-col items-end gap-4 md:flex-row">
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      วัตถุประสงค์ (ทำเพื่อ?){" "}
                      <span className="text-red-500">*</span>
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="เช่น กระตุ้นยอดขาย"
                      className={`
                      rounded-md 
                      focus:border-[0.5px] 
                      appearance-none                   
                      ${
                        touched &&
                        touched.job_Objective &&
                        errors &&
                        errors.job_Objective
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 
                      placeholder:opacity-100 
                      ${
                        touched &&
                        touched.job_Objective &&
                        errors &&
                        errors.job_Objective
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      }                                
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none`}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="job_Objective"
                      value={values.job_Objective || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched &&
                          touched.job_Objective &&
                          errors &&
                          errors.job_Objective
                      )}
                    />
                    {touched &&
                      touched.job_Objective &&
                      errors &&
                      errors.job_Objective && (
                        <p className="font-normal text-red-500 text-[12px]">
                          {errors.job_Objective}
                        </p>
                      )}
                  </div>
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      กลุ่มเป้าหมาย (ไครดู?){" "}
                      <span className="text-red-500">*</span>
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="เช่น ลูกค้าใหม่"
                      className={`
                      rounded-md 
                      focus:border-[0.5px] 
                      appearance-none                   
                      ${
                        touched &&
                        touched.job_Target &&
                        errors &&
                        errors.job_Target
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 
                      placeholder:opacity-100 
                      ${
                        touched &&
                        touched.job_Target &&
                        errors &&
                        errors.job_Target
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      }                                
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none`}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="job_Target"
                      value={values.job_Target || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched &&
                          touched.job_Target &&
                          errors &&
                          errors.job_Target
                      )}
                    />
                    {touched &&
                      touched.job_Target &&
                      errors &&
                      errors.job_Target && (
                        <p className="font-normal text-red-500 text-[12px]">
                          {errors.job_Target}
                        </p>
                      )}
                  </div>
                </div>
                <div className="mb-3 flex flex-col items-end gap-4 md:flex-row">
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      MODE & TONE <span className="text-red-500">*</span>
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="เช่น สนุกสนาน, ทางการ..."
                      className={`
                      rounded-md 
                      focus:border-[0.5px] 
                      appearance-none                   
                      ${
                        touched && touched.job_mt && errors && errors.job_mt
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 
                      placeholder:opacity-100 
                      ${
                        touched && touched.job_mt && errors && errors.job_mt
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      }                                
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none`}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="job_mt"
                      value={values.job_mt || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched && touched.job_mt && errors && errors.job_mt
                      )}
                    />
                    {touched && touched.job_mt && errors && errors.job_mt && (
                      <p className="font-normal text-red-500 text-[12px]">
                        {errors.job_mt}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      KEY MESSAGE / FORMAT{" "}
                      <span className="text-red-500">*</span>
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="ข้อความหลัก / ขนาดภาพ"
                      className={`
                      rounded-md 
                      focus:border-[0.5px] 
                      appearance-none                   
                       ${
                         touched && touched.job_mf && errors && errors.job_mf
                           ? "!border-t-red-500 "
                           : "!border-t-gray-400 "
                       }  
                      placeholder:text-blue-gray-300 
                      placeholder:opacity-100 
                      ${
                        touched && touched.job_mf && errors && errors.job_mf
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      }                                
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none`}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="job_mf"
                      value={values.job_mf || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched && touched.job_mf && errors && errors.job_mf
                      )}
                    />
                    {touched && touched.job_mf && errors && errors.job_mf && (
                      <p className="font-normal text-red-500 text-[12px]">
                        {errors.job_mf}
                      </p>
                    )}
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
                    className={`
                      rounded-md 
                      focus:border-[0.5px] 
                      appearance-none                   
                      ${
                        touched &&
                        touched.job_Detail &&
                        errors &&
                        errors.job_Detail
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 
                      placeholder:opacity-100 
                      ${
                        touched &&
                        touched.job_Detail &&
                        errors &&
                        errors.job_Detail
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      }                                
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none`}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="job_Detail"
                    value={values.job_Detail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched &&
                        touched.job_Detail &&
                        errors &&
                        errors.job_Detail
                    )}
                  />
                  {touched &&
                    touched.job_Detail &&
                    errors &&
                    errors.job_Detail && (
                      <p className="font-normal text-red-500 text-[12px]">
                        {errors.job_Detail}
                      </p>
                    )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-4 md:flex-row mt-2">
                <div className="w-full">
                  <Input
                    type="file"
                    label="แนบไฟล์ตัวอย่าง (ขนาดไฟล์สูงสุด 35MB)"
                    onChange={(e) => handleUpload(e.target.files[0])}
                    icon={
                      <InformationCircleIcon
                        onClick={() => {
                          if (values.fileShow ) {
                            setFieldValue("open", true);
                          }
                        }}
                        color={values.fileShow ? "blue" : "gray"}
                        className="w-8 "
                      />
                    }
                  />
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
              <DialogUploadFile
                open={values.open}
                iframeFile={values.fileShow}
                name={(values.job_file && values.job_file.name) || ""}
                handleDelete={() => {
                  setFieldValue("fileBase64", "");
                  setFieldValue("fileShow", "");
                  setFieldValue("job_file", "");
                  setFieldValue("open", false);
                }}
                handleClose={() => {
                  setFieldValue("open", false);
                }}
              />
            </Form>
          );
        }}
      </Formik>
    </Card>
  );
};

export default JobInsert;
