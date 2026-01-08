import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function DialogUploadFile({
  open = false,
  iframeFile,
  name = "Upload File",
  handleClose,
  handleDelete
}) {
  return (
    <>
      <Dialog size="lg" open={open} handler={handleClose}>
        <DialogHeader>{name}</DialogHeader>
        <DialogBody>
          {iframeFile && (
            <div className="py-4">
              <iframe
                src={iframeFile}
                className="w-full h-[70vh]"
                title="PDF Preview"
              />
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleDelete}
            className="mr-1"
          >
            <span>ลบ</span>
          </Button>
          <Button variant="gradient" color="blue-gray" onClick={handleClose}>
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
