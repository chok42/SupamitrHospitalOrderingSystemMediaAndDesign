import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function NotFound({open = true,message = "",handleClose = () => {}}) {

  return (
     <Dialog
        open={open}
        size={"xl"}
        handler={handleClose}
      >
        <DialogHeader>404</DialogHeader>
        <DialogBody>
         {message}
        </DialogBody>
          <DialogFooter className="flex justify-center items-end">
          <Button
            variant="text"
            color="red"
            onClick={() => handleClose(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
  );
}

export default NotFound;
