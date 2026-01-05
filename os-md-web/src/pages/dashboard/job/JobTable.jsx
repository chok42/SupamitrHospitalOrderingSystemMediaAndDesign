import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Button,
  CardHeader,
} from "@material-tailwind/react";
import { GetListJobService } from "@/services/job.service";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import MyContext from "@/context/MyContext";

export function JobTable() {
  const navigate = useNavigate();
  const {setLoader} = useContext(MyContext)
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await GetListJobService();
    if (res) {
      setJobs(res);
    } else {
      setJobs([]);
    }
  };
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* {jobs && jobs.length > 0 && (
        <Card>
          <CardBody className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center gap-2">
              <div>
                <Avatar alt="5" />
              </div>
              <div className="flex flex-col">
                <Typography variant="h6" color="black">
                  Projects Table
                </Typography>
                <Typography variant="h6" color="black">
                  JOB-001 Marketing
                </Typography>
                <Typography variant="h6" color="black">
                  {toThaiDateTimeString(Date.now())}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col">
              <Typography variant="h6" color="black">
                Status
              </Typography>
            </div>
          </CardBody>
        </Card>
      )} */}

      <Card>
        <CardHeader
          variant="gradient"
          className="mb-8 p-6 flex justify-between items-center bg-[#44AA32]"
        >
          <Typography variant="h6" color="white">
            ตารางงาน
          </Typography>
          <Button
            onClick={() => navigate("insert")}
            className="flex justify-center items-center bg-[#FFFFFF]"
          >
            <PlusIcon className="w-5 text-[#0057A1]" />
            <Typography variant="h3" className="text- text-xs text-[#0057A1]">
              แจ้งงานใหม่
            </Typography>
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["รหัสงาน", "หัวข้องาน","ชื่อผู้แจ้ง", "ชื่อผู้ตรวจ", "แผนก", "วันที่",""].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {jobs && jobs.length > 0 && jobs.map(
                ({ code, name, members, budget, completion }, key) => {
                  const className = `py-3 px-5 ${
                    key === jobs.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          {/* <Avatar src={img} alt={name} size="sm" /> */}
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {code}
                          </Typography>
                        </div>
                      </td>
                      {/* <td className={className}>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {budget}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="w-10/12">
                          <Typography
                            variant="small"
                            className="mb-1 block text-xs font-medium text-blue-gray-600"
                          >
                            {completion}%
                          </Typography>
                          <Progress
                            value={completion}
                            variant="gradient"
                            color={completion === 100 ? "green" : "gray"}
                            className="h-1"
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          <EllipsisVerticalIcon
                            strokeWidth={2}
                            className="h-5 w-5 text-inherit"
                          />
                        </Typography>
                      </td> */}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default JobTable;
