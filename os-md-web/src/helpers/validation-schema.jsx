import * as Yup from "yup";

// export const schemaTravel = Yup.object().shape({
//   travel_Name: Yup.string()
//     .max(100, "สูงสุด 100 ตัวอักษร")
//     .required("กรุณาระบุข้อมูล"),
//   travel_Address: Yup.string()
//     .max(100, "สูงสุด 100 ตัวอักษร")
//     .required("กรุณาระบุข้อมูล"),
//   travel_Phone: Yup.string()
//     .max(100, "สูงสุด 100 ตัวอักษร")
//     .required("กรุณาระบุข้อมูล"),
// });

// export const dashSchemaTravelActivity = Yup.object().shape({
//   activity_Name: Yup.string()
//     .max(100, "สูงสุด 100 ตัวอักษร")
//     .required("กรุณาระบุข้อมูล"),
// });

// export const schemaLoginMember = Yup.object().shape({
//   member_Username: Yup.string().required("กรุณาระบุข้อมูลในช่องว่าง"),
//   member_Password: Yup.string().required("กรุณาระบุข้อมูลในช่องว่าง"),
// });

// export const schemaReview = Yup.object().shape({
//   review_Name: Yup.string().required("กรุณาระบุข้อมูลในช่องว่าง"),
//   review_Description: Yup.string().required("กรุณาระบุข้อมูลในช่องว่าง"),
// });

// export const schemaRegisterMember = Yup.object().shape({
//   member_Email: Yup.string()
//     .max(250, "สูงสุด 250 ตัวอักษร")
//     .required("กรุณาระบุข้อมูลในช่องว่าง"),
//   member_Username: Yup.string()
//     .min(4, "น้อยสุด 4 ตัวอักษร")
//     .max(50, "สูงสุด 50 ตัวอักษร")
//     .required("กรุณาระบุข้อมูลในช่องว่าง"),
//   member_Password: Yup.string()
//     .min(8, "น้อยสุด 8 ตัวอักษร")
//     .max(50, "สูงสุด 50 ตัวอักษร")
//     .required("กรุณาระบุข้อมูลในช่องว่าง"),
// });

// export const schemaEditMemPass = Yup.object().shape({
//   member_Password: Yup.string().required("กรุณาระบุรหัสผ่าน"),
//   member_NewPassword: Yup.string()
//     .required("กรุณาระบุรหัสผ่าน")
//     .min(8, "รหัสผ่านของคุณต้องมีความยาวระหว่าง 8-16 ตัวอักษร")
//     .max(16, "รหัสผ่านของคุณต้องมีความยาวระหว่าง 8-16 ตัวอักษร"),
//   member_ConfirmPassword: Yup.string()
//     .required("กรุณาระบุรหัสผ่าน")
//     .oneOf(
//       [Yup.ref("member_NewPassword"), null],
//       "รหัสผ่านของคุณไม่ตรงกัน กรุณาใส่อีกครั้ง"
//     ),
// });

// export const schemaEditMember = Yup.object().shape({
//   member_Name: Yup.string()
//     .min(4, "ชื่อของคุณต้องมีความยาวระหว่าง 4-50 ตัวอักษร")
//     .max(50, "ชื่อของคุณต้องมีความยาวระหว่าง 4-50 ตัวอักษร")
//     .required("กรุณาระบุข้อมูลในช่องว่าง"),
// });

// export const schemaContact = Yup.object().shape({
//   contact_FullName: Yup.string()
//     .max(100, "สูงสุด 100 ตัวอักษร")
//     .required("กรุณาระบุข้อมูล"),
//   contact_Email: Yup.string()
//     .max(100, "สูงสุด 200 ตัวอักษร")
//     .required("กรุณาระบุข้อมูล"),
//   contact_Detail: Yup.string().required("กรุณาระบุข้อมูล"),
//   contact_Check: Yup.bool().oneOf([true],'ข้อกำหนด'),
// });
