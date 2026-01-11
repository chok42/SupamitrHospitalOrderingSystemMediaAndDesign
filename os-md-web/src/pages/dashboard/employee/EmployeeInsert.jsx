import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
//context
import MyContext from "@/context/MyContext";
//service
import { InsertEmployeeService } from "@/services/employee.service";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { dpmData, pstData, roleData, staEmpData } from "@/data";

const employeeSchema = Yup.object().shape({
  username: Yup.string().required("กรุณาระบุชื่อผู้ใช้งาน"),
  lastname: Yup.string().required("กรุณาระบุชื่อจริง"),
  firstname: Yup.string().required("กรุณาระบุนามสกุล"),
  dpm_id: Yup.string().required("กรุณาเลือกข้อมูล"),
  role_id: Yup.string().required("กรุณาเลือกข้อมูล"),
  status_id: Yup.string().required("กรุณาเลือกข้อมูล"),
});

export function EmployeeInsert() {
  const navigate = useNavigate();
  const { setLoader } = useContext(MyContext);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitEmployee = async (value) => {
    setLoader(true);
    const newValue = {
      ...value,
      role_id: value.role_id.toString(),
      dpm_id: value.dpm_id.toString(),
      pst_id: value.pst_id.toString(),
    };
    const resp = await InsertEmployeeService(newValue);
    setLoader(false);
    if (resp && resp.success) {
      navigate(-1);
    }
  };

  return (
    <div className="flex justify-center min-h-[75vh]">
      <Card color="transparent" shadow={true} className="p-6">
        <Typography variant="h3" className="text-[#0057A1] text-center">
          เพิ่มข้อมูลพนักงาน
        </Typography>

        <Formik
          initialValues={{
            code: "",
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            picture: "",
            role_id: "",
            dpm_id: "",
            pst_id: "",
            status_id: "",
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
            <Form onSubmit={handleSubmit} className="h-full mt-8">
              <div className=" w-full h-full flex flex-col justify-between ">
                <div className="w-full grid sm:grid-cols-2 grid-cols-1  ">
                  <div className="flex flex-col  xl:w-full p-1">
                    <Input
                      type="text"
                      label="รหัสพนักงาน"
                      variant="outlined"
                      size="lg"
                      error={Boolean(
                        touched && touched.code && errors && errors.code
                      )}
                      name="code"
                      value={values.code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched && touched.code && errors && errors.code && (
                      <p className="font-normal text-red-500 text-[12px]">
                        {errors.code}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col  xl:w-full p-1">
                    <Input
                      type="text"
                      label="ชื่อผู้ใช้งาน"
                      variant="outlined"
                      size="lg"
                      error={Boolean(
                        touched && touched.username && errors && errors.username
                      )}
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched &&
                      touched.username &&
                      errors &&
                      errors.username && (
                        <p className="font-normal text-red-500 text-[12px]">
                          {errors.username}
                        </p>
                      )}
                  </div>
                  <div className="flex flex-col  xl:w-full p-1">
                    <Input
                      label="รหัสผ่าน"
                      type={showPassword ? "text" : "password"}
                      size="lg"
                      icon={
                        showPassword ? (
                          <EyeIcon onClick={() => setShowPassword(false)} />
                        ) : (
                          <EyeSlashIcon onClick={() => setShowPassword(true)} />
                        )
                      }
                      error={Boolean(
                        touched && touched.password && errors && errors.password
                      )}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched &&
                      touched.password &&
                      errors &&
                      errors.password && (
                        <p className="font-normal text-red-500 text-[12px]">
                          {errors.password}
                        </p>
                      )}
                  </div>
                  <div className="flex flex-col  xl:w-full p-1">
                    <Input
                      type="text"
                      label="ชื่อจริง"
                      variant="outlined"
                      size="lg"
                      name="firstname"
                      value={values.firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched &&
                          touched.firstname &&
                          errors &&
                          errors.firstname
                      )}
                    />
                    {touched &&
                      touched.firstname &&
                      errors &&
                      errors.firstname && (
                        <p className="font-normal text-red-500 text-[12px]">
                          {errors.firstname}
                        </p>
                      )}
                  </div>
                  <div className="flex flex-col  xl:w-full p-1">
                    <Input
                      type="text"
                      label="นามสกุล"
                      variant="outlined"
                      size="lg"
                      error={Boolean(
                        touched && touched.lastname && errors && errors.lastname
                      )}
                      name="lastname"
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched &&
                      touched.lastname &&
                      errors &&
                      errors.lastname && (
                        <p className="font-normal text-red-500 text-[12px]">
                          {errors.lastname}
                        </p>
                      )}
                  </div>
                  <div className="flex flex-col  xl:w-full p-1">
                    <Input
                      type="text"
                      label="เบอร์โทรศัพท์"
                      variant="outlined"
                      size="lg"
                      error={Boolean(
                        touched && touched.phone && errors && errors.phone
                      )}
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched && touched.phone && errors && errors.phone && (
                      <p className="font-normal text-red-500 text-[12px]">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col  xl:w-full p-1">
                    <Input
                      type="text"
                      label="อีเมล"
                      variant="outlined"
                      size="lg"
                      error={Boolean(
                        touched && touched.email && errors && errors.email
                      )}
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched && touched.email && errors && errors.email && (
                      <p className="font-normal text-red-500 text-[12px]">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col  xl:w-full p-1">
                    <select
                      className="w-full bg-transparent placeholder:text-blue-gray-400 text-blue-gray-700 text-sm border border-blue-gray-200 rounded pl-3 pr-8 py-3 transition duration-300 normal-case focus:outline-none focus:border-blue-gray-400 hover:border-blue-gray-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                      value={values.dpm_id}
                      onChange={(e) => setFieldValue("dpm_id", e.target.value)}
                      error={Boolean(
                        touched && touched.dpm_id && errors && errors.dpm_id
                      )}
                    >
                      <option value="">แผนก</option>
                      {dpmData.map(({ id, name }) => (
                        <option value={id}>{name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col  xl:w-full p-1">
                    <select
                      className="w-full bg-transparent placeholder:text-blue-gray-400 text-blue-gray-700 text-sm border border-blue-gray-200 rounded pl-3 pr-8 py-3 transition duration-300 normal-case focus:outline-none focus:border-blue-gray-400 hover:border-blue-gray-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                      value={values.pst_id}
                      onChange={(e) => setFieldValue("pst_id", e.target.value)}
                      error={Boolean(
                        touched && touched.pst_id && errors && errors.pst_id
                      )}
                    >
                      <option value="">ตำแหน่ง</option>
                      {pstData.map(({ id, name }) => (
                        <option value={id}>{name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col xl:w-full p-1">
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
                      <option value="">สถานะการใช้งาน</option>
                      {staEmpData.map((sta, index) => (
                        <option value={sta.id} key={index}>
                          {sta.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col  xl:w-full p-1">
                    <select
                      className="w-full bg-transparent placeholder:text-blue-gray-400 text-blue-gray-700 text-sm border border-blue-gray-200 rounded pl-3 pr-8 py-3 transition duration-300 normal-case focus:outline-none focus:border-blue-gray-400 hover:border-blue-gray-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                      value={values.role_id}
                      onChange={(e) => setFieldValue("role_id", e.target.value)}
                      error={Boolean(
                        touched && touched.role_id && errors && errors.role_id
                      )}
                    >
                      <option value="">สิทธิ์การใช้งาน</option>
                      {roleData.map(({ id, name }) => (
                        <option value={id}>{name}</option>
                      ))}
                    </select>
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
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

export default EmployeeInsert;
