import { Spinner } from "@material-tailwind/react";

 const SpinnerLoader = () => {
  return (
  <div className="fixed top-[50%] left-[50%] flex justify-center items-center z-[9999] bg-[rgba(0, 0, 0, 0.5)]">
       <Spinner color="green" className="w-12 h-12"/>
  </div>
   
   
  );
};
export default SpinnerLoader