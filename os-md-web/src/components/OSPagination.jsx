import React from "react";
import {
  Button,
  IconButton,
} from "@material-tailwind/react";
import ReactPaginate from "react-paginate";

export function OSPagination({
  page = 1,
  handlePage,
  pageCount = 0,
  className = "",
}) {
  return (
    <div className={className ? className : "flex flex-col items-center gap-2 w-full"}>
      <ReactPaginate
        className="flex items-center gap-4 "
        breakLabel="..."
        pageLabelBuilder={(number) => (
          <IconButton color={page === number ? "deep-purple" : "teal"} size="sm">
            {number}
          </IconButton>
        )}
        onPageChange={handlePage}
        pageCount={pageCount}
        nextLabel={
          <Button
            variant="text"
            className="flex items-center gap-1 rounded-full"
          >
            ถัดไป
          </Button>
        }
        previousLabel={
          <Button
            variant="text"
            className="flex items-center gap-1 rounded-full"
          >
            ย้อนกลับ
          </Button>
        }
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
