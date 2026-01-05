import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
//context
import MyContext from "@/context/MyContext";
//service
//import { GetListDepartmentService } from "@/services/department.service";
//import { GetListPositionService } from "@/services/position.service";
//import { GetListRoleService } from "@/services/role.service";
import { InsertEmployeeService } from "@/services/employee.service";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { departmentsData, positionData, roleData } from "@/data";

const employeeSchema = Yup.object().shape({
  code: Yup.string().required("กรุณาระบุข้อมูล"),
  username: Yup.string().required("กรุณาระบุข้อมูล"),
  password: Yup.string().required("กรุณาระบุข้อมูล"),
  // pst_id: Yup.string().required("กรุณาระบุข้อมูล"),
  // dpm_id: Yup.string().required("กรุณาระบุข้อมูล"),
  // role_id: Yup.string().required("กรุณาระบุข้อมูล"),
});

export function EmployeeInsert() {
  const navigate = useNavigate();
  const { setLoader } = useContext(MyContext);
  const [showPassword, setShowPassword] = useState(false);
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
                <div className="flex w-full flex-wrap max-w-3xl  ">
                  <div className="flex flex-col  xl:w-1/2 p-1">
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
                  <div className=" flex flex-col gap-1 xl:w-1/2 p-1">
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
                  <div className=" flex flex-col gap-1 xl:w-1/2 p-1">
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
                  <div className=" flex flex-col gap-1 xl:w-1/2 p-1">
                    <Input
                      type="text"
                      label="ชื่อจริง"
                      variant="outlined"
                      size="lg"
                      error={Boolean(
                        touched &&
                          touched.firstname &&
                          errors &&
                          errors.firstname
                      )}
                      name="firstname"
                      value={values.firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                  <div className=" flex flex-col gap-1 xl:w-1/2 p-1">
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
                  <div className=" flex flex-col gap-1 xl:w-1/2 p-1">
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
                  <div className=" flex flex-col gap-1 xl:w-1/2 p-1">
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
                  <div className=" flex flex-col gap-1 xl:w-1/2 p-1">
                    <select
                      className="w-full bg-transparent placeholder:text-blue-gray-400 text-blue-gray-700 text-sm border border-blue-gray-200 rounded pl-3 pr-8 py-3 transition duration-300 normal-case focus:outline-none focus:border-blue-gray-400 hover:border-blue-gray-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                      value={values.dpm_id}
                      onChange={(e) => setFieldValue("dpm_id", e.target.value)}
                      error={Boolean(
                        touched && touched.dpm_id && errors && errors.dpm_id
                      )}
                    >
                      <option value="">แผนก</option>
                      {departmentsData.map(({ id, name }) => (
                        <option value={id}>{name}</option>
                      ))}
                    </select>
                  </div>

                  <div className=" flex flex-col gap-1 xl:w-1/2 p-1">
                    <select
                      className="w-full bg-transparent placeholder:text-blue-gray-400 text-blue-gray-700 text-sm border border-blue-gray-200 rounded pl-3 pr-8 py-3 transition duration-300 normal-case focus:outline-none focus:border-blue-gray-400 hover:border-blue-gray-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                      value={values.pst_id}
                      onChange={(e) => setFieldValue("pst_id", e.target.value)}
                      error={Boolean(
                        touched && touched.pst_id && errors && errors.pst_id
                      )}
                    >
                      <option value="">ตำแหน่ง</option>
                      {positionData.map(({ id, name }) => (
                        <option value={id}>{name}</option>
                      ))}
                    </select>
                  </div>
                  <div className=" flex flex-col gap-1 xl:w-1/2 p-1">
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
