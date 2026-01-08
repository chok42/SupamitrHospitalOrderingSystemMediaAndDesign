import React from "react";
import {
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export function OSPagination({
  total = 0,
  page = 0,
  pageSize = 10,
  onPageChange,
  handleChangePageSize = async (number) => await number,
  pageCount,
  className = "",
}) {
  return (
    <div className={className ? className : "flex flex-col items-center gap-2"}>
      <Menu>
        <MenuHandler>
          <Button size="md">จำนวนข้อมูล {pageSize}</Button>
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => handleChangePageSize(10)}>10</MenuItem>
          <MenuItem onClick={() => handleChangePageSize(30)}>30</MenuItem>
          <MenuItem onClick={() => handleChangePageSize(50)}>50</MenuItem>
          <MenuItem onClick={() => handleChangePageSize(100)}>100</MenuItem>
          {total > 0 && (
            <MenuItem onClick={() => handleChangePageSize(total)}>
              ทั้งหมด
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <ReactPaginate
        className="flex items-center gap-4 "
        breakLabel="..."
        pageLabelBuilder={(number) => (
          <IconButton disabled={Boolean(page === number)} color={page === number ? "blue-gray" : "green"} size="sm">
            {number}
          </IconButton>
        )}
        onPageChange={onPageChange}
        pageCount={pageCount}
        nextLabel={
          <Button
            //disabled={Boolean(page === 1)}
              variant="outlined"
            className="flex items-center gap-1 rounded-full"
          >
           ถัดไป
          </Button>
        }
        previousLabel={
          <Button
            //disabled={Boolean(page === pageCount)}
            variant="outlined"
            className="flex items-center gap-1 rounded-full"
          >
           ย้อนกลับ
          </Button>
        }
        renderOnZeroPageCount={null}
      />
      <Typography className="font-extrabold text-[14px]">{`ทั้งหมด ${total} รายการ`}</Typography>
    </div>
  );
}
