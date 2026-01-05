import { Spinner } from "@material-tailwind/react";

 const SpinnerLoader = () => {
  return (
   <div className="absolute top-[50%]  left-[50%] ">
      <Spinner color="green" className="w-12 h-12"/>
    </div>
  );
};
export default SpinnerLoader