import  {  useState } from "react";

export default function ContextState() {
  const [loader, setLoader] = useState(false);
  const [dataEmp, setDataEmp] = useState(null);
  const [checkLogin, setCheckLogin] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const handleForm = () => {
    setOpenForm(false);
  };

  return {
    loader,
    setLoader,
    dataEmp,
    setDataEmp,
    checkLogin,
    setCheckLogin,
    openForm,
    setOpenForm,
    handleForm,
  };
}
