
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
//data
import { dpmData } from "@/data";
//helpers
import { inputLengthEnglish } from "@/helpers/format";
import { InsertEmployeeService } from "@/services/employee.service";
import Swal from "sweetalert2";
import { useContext } from "react";
import MyContext from "@/context/MyContext";


const signUpSchema = Yup.object().shape({
  username: Yup.string()
  .min(5, "ชื่อผู้ใช้ต้องมีความยาวมากกว่า 4 ตัวอักษร")
  .max(50,"ชื่อผู้ใช้ต้องมีความยาวไม่เกิน 50 ตัวอักษร")
  .matches(/[0-9]/, "ชื่อผู้ใช้ต้องมีตัวเลข")
  .matches(/[a-zA-Z]/, "โปรดระบุชื่อผู้ใช้เป็นภาษาอังกฤษ")
  .required("กรุณาระบุชื่อผู้ใช้"),
  firstname: Yup.string().required("กรุณาระบุชื่อจริง"),
  lastname: Yup.string().required("กรุณาระบุนามสกุล"),
  dpm_id: Yup.string().required("กรุณาเลือกแผนก"),
  password: Yup.string()
    .required("กรุณาระบุรหัสผ่าน")
    .min(8, "รหัสผ่านต้องมีความยาว 8 ตัวอักษร")
    .max(30, "รหัสผ่านต้องมีความยาวไม่เกิน 30 ตัวอักษร")
    .matches(/[0-9]/, "รหัสผ่านต้องมีตัวเลข")
    .matches(/[a-z]/, "รหัสผ่านต้องมีตัวพิมพ์เล็ก")
    .matches(/[A-Z]/, "รหัสผ่านต้องขึ้นต้นด้วยตัวพิมพ์ใหญ่")
    .matches(/[^\w]/, "รหัสผ่านต้องมีสัญลักษณ์"),
  confirm: Yup.string()
  .required("กรุณาระบุยืนยันรหัสผ่าน")
  .oneOf(
    [Yup.ref("password"), null],
    '"รหัสผ่าน" ต้องมีค่าตรงกัน'
  ),
});

export function SignUp() {
  const { setLoader } = useContext(MyContext);

  const onSubmitSignUp = async (val, resetForm) => {
    console.log('val',val);
    
    setLoader(true);
    const resp = await InsertEmployeeService(val);
    setLoader(false);
    if (resp && resp.success) {
      console.log("msg:", resp.message);
      resetForm();
      Swal.fire({
        title: "สมัครสมาชิกสำเร็จ",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (resp && resp.success === false && resp.status === "409") {
      console.log("msg:", resp.message);
    } else if (resp && resp.success === false && resp.status === "500") {
      console.log("msg:", resp.message);
    }
  };
  return (
    <section className="m-8 flex">
      <div className="w-2/4 h-[90vh] hidden lg:block ">
        <div className="flex justify-center items-center h-full">
          <img
            src="/img/background/bg-spm.avif"
            className="h-full w-full object-cover rounded-3xl "
          />
        </div>
      </div>
      <div className="w-full lg:w-3/5 sm:w-full flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold ">
            สมัครสมาชิก
          </Typography>
        </div>
        <Card color="transparent" shadow={false}>
          <Formik
            enableReinitialize
            initialValues={{
              username: "",
              firstname: "",
              lastname: "",
              dpm_id: "",
              password: "",
              confirm: "",
              phone:"",
              email:"",
              picture:"",
              role_id:"",
              pst_id:""
            }}
            validationSchema={signUpSchema}
            onSubmit={async (val,{resetForm }) => await onSubmitSignUp(val,resetForm)}
          >
            {({
              values,
              touched,
              errors,
              setFieldValue,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit} className="mt-8 mb-2 ">
                <div className="mb-1 flex flex-col gap-2">
                  <div className="w-full flex flex-col ">
                    <Typography variant="h6" color="blue-gray">
                      ชื่อผู้ใช้
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Supamitr09"
                      name="username"
                      value={values.username}
                      onChange={(e)=> setFieldValue('username',inputLengthEnglish(e.target.value))}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched && touched.username && errors && errors.username
                      )}
                    />
                    {touched && touched.username && errors && errors.username && (
                      <p className="font-normal text-red-500 text-[12px]">
                        {errors.username}
                      </p>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
                    <div className="w-full flex flex-col ">
                      <Typography variant="h6" color="blue-gray">
                        ชื่อจริง
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="มะม่วง"
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
                    <div className="w-full flex flex-col ">
                      <Typography variant="h6" color="blue-gray">
                        นามสกุล
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="สุขดี"
                        name="lastname"
                        value={values.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(
                          touched &&
                            touched.lastname &&
                            errors &&
                            errors.lastname
                        )}
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
                  </div>

                  <div className="w-full flex flex-col ">
                    <Typography variant="h6" color="blue-gray">
                      แผนก
                    </Typography>
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
                     ${touched && touched.dpm_id && errors && errors.dpm_id ? "border-red-500 " : "border-blue-gray-400"}   
                     ${touched && touched.dpm_id && errors && errors.dpm_id ? "focus:border-red-500 " : "focus:border-blue-gray-400"}                                             
                    hover:border-blue-gray-400  
                      appearance-none cursor-pointer
                      `}
                      name="dpm_id"
                      value={values.dpm_id || ""}
                      onChange={(e) => {
                        setFieldValue("dpm_id", e.target.value)
                      }}
                      onBlur={handleBlur}
   
                    >
                      <option value="">None</option>
                      {dpmData.map((dpm, index) => (
                        <option value={dpm.id} key={index}>
                          {dpm.name}
                        </option>
                      ))}
                    </select>
                    {touched && touched.dpm_id && errors && errors.dpm_id && (
                      <p className="font-normal text-red-500 text-[12px]">
                        {errors.dpm_id}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col ">
                    <Typography variant="h6" color="blue-gray">
                      รหัสผ่าน
                    </Typography>
                    <Input
                      type="password"
                      size="lg"
                      placeholder="********"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched && touched.password && errors && errors.password
                      )}
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
                  <div className="w-full flex flex-col ">
                    <Typography variant="h6" color="blue-gray">
                      ยืนยันรหัสผ่าน
                    </Typography>
                    <Input
                      type="password"
                      size="lg"
                      placeholder="********"
                      name="confirm"
                      value={values.confirm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched && touched.confirm && errors && errors.confirm
                      )}
                    />
                    {touched && touched.confirm && errors && errors.confirm && (
                      <p className="font-normal text-red-500 text-[12px]">
                        {errors.confirm}
                      </p>
                    )}
                  </div>
                </div>
                <Button type="submit" className="mt-6 text-[16px]" fullWidth>
                  สมัครสมาชิก
                </Button>
                <Typography
                  color="gray"
                  className="mt-4 text-center font-normal"
                >
                  มีบัญชีอยู่แล้ว?{" "}
                  <Link
                    to="/auth/sign-in"
                    className="font-medium text-gray-900"
                  >
                    เข้าสู่ระบบ
                  </Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </section>
  );
}

export default SignUp;
