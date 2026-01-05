import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
//context
import MyContext from "@/context/MyContext";
//service
//import { GetListDepartmentService } from "@/services/department.service";
//import { GetListPositionService } from "@/services/position.service";
//import { GetListRoleService } from "@/services/role.service";
import { InsertEmployeeService } from "@/services/employee.service";
import {
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
  MusicalNoteIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { departmentsData, positionData, roleData } from "@/data";
import jobTypeData from "@/data/jobtype-data";
import jobStatusData from "@/data/jobstatus-data";
import { InsertJobService } from "@/services/job.service";

const employeeSchema = Yup.object().shape({
  code: Yup.string().required("กรุณาระบุข้อมูล"),
  // username: Yup.string().required("กรุณาระบุข้อมูล"),
  // password: Yup.string().required("กรุณาระบุข้อมูล"),
  // pst_id: Yup.string().required("กรุณาระบุข้อมูล"),
  // dpm_id: Yup.string().required("กรุณาระบุข้อมูล"),
  // role_id: Yup.string().required("กรุณาระบุข้อมูล"),
});

export function JobInsert() {
  const navigate = useNavigate();
  const {dataEmp, setLoader } = useContext(MyContext);
  const [showPassword, setShowPassword] = useState(false);
  const [date, setDate] = useState();
  // const [departments, setDepartments] = useState([]);
  // const [positions, setPositions] = useState([]);
  // const [roles, setRoles] = useState([]);

  // useMemo(async () => {
  //   setLoader(true);
  //   const res_dpm = await GetListDepartmentService();
  //   const res_role = await GetListRoleService();
  //   const res_pst = await GetListPositionService();
  //   setLoader(false);

  //   if (res_dpm) {
  //     setDepartments(res_dpm);
  //   }
  //   if (res_role) {
  //     setRoles(res_role);
  //   }
  //   if (res_pst) {
  //     setPositions(res_pst);
  //   }
  // }, []);

  const onSubmitEmployee = async (value) => {
    setLoader(true);
    const resp = await InsertJobService(value);
    setLoader(false);

    if (resp && resp.success) {
      navigate(-1);
    }
  };

  const handleUpload = async () => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      return base64
    };

    reader.readAsDataURL(file);
  };


  return (
    <Card shadow={true} className="px-8 py-20 container mx-auto">
      <Typography variant="h5" color="blue-gray">
        แบบฟอร์มแจ้งงาน (Brief Form)
      </Typography>
      <Typography variant="small" className="text-gray-600 font-normal mt-1">
        กรุณากรอกข้อมูลให้ครบถ้วนเพื่อความรวดเร็จ
      </Typography>
      <Formik
        initialValues={{
          code: "",
          name: "",
          detail: "",
          dateTime: "",
          creationDate: "",
          tarket: "",
          objective: "",
          mode_tone: "",
          mes_format: "",
          file: "",
          type_id: "",
          status_id: "",
          dpm_id: "",
          pst_id: "",
          emp_name:""
        }}
        validationSchema={employeeSchema}
        onSubmit={(value) => onSubmitEmployee(value)}
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
            {dataEmp &&              <div className=" mb-6 w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  ชื่อผู้แจ้ง
                </Typography>
                <Input
                  disabled
                  size="lg"
                  placeholder="Supamitr"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-gray-700 border-t-blue-gray-200"
                  value={dataEmp.firstname}
                />
              </div>}
            <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">

              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  แผนก (Department)
                </Typography>

                <select
                  className="w-full bg-transparent placeholder:text-blue-gray-400 text-blue-gray-700 text-sm border border-blue-gray-200 rounded pl-3 pr-8 py-[11px] transition duration-300 normal-case focus:outline-none focus:border-blue-gray-400 hover:border-blue-gray-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                  value={values.dpm_id}
                  onChange={(e) => setFieldValue("dpm_id", e.target.value)}
                  error={Boolean(
                    touched && touched.dpm_id && errors && errors.dpm_id
                  )}
                >
                  <option value="">เลือกแผนก</option>
                  {departmentsData.map(({ id, name },index) => (
                    <option key={index} value={id}>{name}</option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  ผู้ตรวจสอบงาน (Reviewer)
                </Typography>

                <select
                  className="w-full bg-transparent placeholder:text-blue-gray-400 text-blue-gray-700 text-sm border border-blue-gray-200 rounded pl-3 pr-8 py-[11px] transition duration-300 normal-case focus:outline-none focus:border-blue-gray-400 hover:border-blue-gray-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                  value={values.dpm_id}
                  onChange={(e) => setFieldValue("dpm_id", e.target.value)}
                  error={Boolean(
                    touched && touched.dpm_id && errors && errors.dpm_id
                  )}
                >
                  <option value="">เลือกชื่อผู้ตรวจสอบ...</option>
                  {/* {departmentsData.map(({ id, name }) => (
                    <option value={id}>{name}</option>
                  ))} */}
                </select>
              </div>
            </div>
            {/* <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              I&apos;m
            </Typography>
            <Select
              size="lg"
              labelProps={{
                className: "hidden",
              }}
              className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
            >
              <Option>Male</Option>
              <Option>Female</Option>
            </Select>
          </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Birth Date
                </Typography>
                <Popover placement="bottom">
              <PopoverHandler>
                <Input
                  size="lg"
                  onChange={() => null}
                  placeholder="Select a Date"
                  value={date ? format(date, "PPP") : ""}
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                />
              </PopoverHandler>
              <PopoverContent>
                <DayPicker
                  mode="single"
                  selected={date}
                  onSelect={setDate as any}
                  showOutsideDays
                  className="border-0"
                  classNames={{
                    caption:
                      "flex justify-center py-2 mb-4 relative items-center",
                    caption_label: "text-sm !font-medium text-gray-900",
                    nav: "flex items-center",
                    nav_button:
                      "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                    nav_button_previous: "absolute left-1.5",
                    nav_button_next: "absolute right-1.5",
                    table: "w-full border-collapse",
                    head_row: "flex !font-medium text-gray-900",
                    head_cell: "m-0.5 w-9 !font-normal text-sm",
                    row: "flex w-full mt-2",
                    cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 !font-normal",
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
              </div>
              <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Day
            </Typography>
            <Select
              size="lg"
              labelProps={{
                className: "hidden",
              }}
              className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
            >
              <Option>1</Option>
              <Option>2</Option>
              <Option>3</Option>
              <Option>4</Option>
              <Option>5</Option>
              <Option>6</Option>
              <Option>7</Option>
              <Option>8</Option>
              <Option>9</Option>
              <Option>10</Option>
              <Option>11</Option>
              <Option>12</Option>
              <Option>13</Option>
              <Option>14</Option>
              <Option>15</Option>
              <Option>16</Option>
              <Option>17</Option>
              <Option>18</Option>
              <Option>19</Option>
              <Option>20</Option>
              <Option>21</Option>
              <Option>22</Option>
              <Option>23</Option>
              <Option>24</Option>
              <Option>25</Option>
              <Option>26</Option>
              <Option>27</Option>
              <Option>28</Option>
              <Option>29</Option>
              <Option>30</Option>
            </Select>
          </div>
              <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Year
            </Typography>
            <Select
              size="lg"
              labelProps={{
                className: "hidden",
              }}
              className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
            >
              <Option>2022</Option>
              <Option>2021</Option>
              <Option>2020</Option>
            </Select>
          </div>
            </div> */}
            <div className="w-full bg-light-blue-50 rounded-md p-2">
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
                    placeholder="emma@mail.com"
                    labelProps={{
                      className: "hidden",
                    }}
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
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
                  <Popover placement="bottom">
                    <PopoverHandler>
                      <Input
                        disabled
                        size="lg"
                        onChange={() => null}
                        placeholder="เลือกวันที่"
                        value={date ? format(date, "PPP") : ""}
                        labelProps={{
                          className: "hidden",
                        }}
                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                      />
                    </PopoverHandler>
                    <PopoverContent>
                      <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        showOutsideDays
                        className="border-0"
                        classNames={{
                          caption:
                            "flex justify-center py-2 mb-4 relative items-center",
                          caption_label: "text-sm !font-medium text-gray-900",
                          nav: "flex items-center",
                          nav_button:
                            "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                          nav_button_previous: "absolute left-1.5",
                          nav_button_next: "absolute right-1.5",
                          table: "w-full border-collapse",
                          head_row: "flex !font-medium text-gray-900",
                          head_cell: "m-0.5 w-9 !font-normal text-sm",
                          row: "flex w-full mt-2",
                          cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                          day: "h-9 w-9 p-0 !font-normal",
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
                </div>
              </div>
              <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
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
                    labelProps={{
                      className: "hidden",
                    }}
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
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
                    labelProps={{
                      className: "hidden",
                    }}
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  />
                </div>
              </div>
              <div className="flex flex-col items-end gap-4 md:flex-row">
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
                    labelProps={{
                      className: "hidden",
                    }}
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
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
                    labelProps={{
                      className: "hidden",
                    }}
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-4 md:flex-row mt-2">
              <div className="w-full">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 bg-blue-50 border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium"
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
                        <span className="font-semibold">แนปไฟล์ตัวอย่าง (Refference)</span>{" "}
                 
                      </p>
                      {/* <p className="text-xs">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p> */}
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={(e)=> handleUpload(e.target.files[0])} />
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end gap-2">
              <Button
                onClick={() => navigate(-1)}
                color="blue"
                className="mt-6"
              >
                ย้อนกลับ
              </Button>
              <Button type="submit" className="mt-6 bg-[#44AA32]">
                บันทึก
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default JobInsert;
