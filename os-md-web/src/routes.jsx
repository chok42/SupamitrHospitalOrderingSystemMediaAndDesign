import {
  HomeIcon,
  TableCellsIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Home, EmployeeTable, EmployeeInsert, EmployeeUpdate, JobTable, JobInsert, JobUpdate } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    role: "R99",
    token:true,
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "ตารางพนักงาน",
        path: "/employee",
        element: <EmployeeTable />,
        elements: [
          {
            icon2: <UserIcon {...icon} />,
            name2: "employee insert",
            path2: "/employee/insert",
            element2: <EmployeeInsert />,
            show2: false,
          },
          {
            icon2: <UserIcon {...icon} />,
            name2: "employee insert",
            path2: "/employee/update",
            element2: <EmployeeUpdate />,
            show2: false,
          },
        ],
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "ตารางงาน",
        path: "/job",
        element: <JobTable />,
        elements: [
          {
            icon2: <UserIcon {...icon} />,
            name2: "job insert",
            path2: "/job/insert",
            element2: <JobInsert />,
            show2: false,
          },
          {
            icon2: <UserIcon {...icon} />,
            name2: "job insert",
            path2: "/job/update",
            element2: <JobUpdate />,
            show2: false,
          },
        ],
      },
    ],
  },
    {
    layout: "dashboard",
    role: "R01",
    token:true,
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "แจ้งงานสื่อ",
        path: "/job",
        element: <JobTable />,
        elements: [
          {
            icon2: <UserIcon {...icon} />,
            name2: "job insert",
            path2: "/job/insert",
            element2: <JobInsert />,
            show2: false,
          },
          {
            icon2: <UserIcon {...icon} />,
            name2: "job insert",
            path2: "/job/update",
            element2: <JobUpdate />,
            show2: false,
          },
        ],
      },
    ],
  },
   {
    layout: "dashboard",
    role: "R02",
    token:true,
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "แจ้งงานสื่อ",
        path: "/job",
        element: <JobTable />,
        elements: [
          {
            icon2: <UserIcon {...icon} />,
            name2: "job insert",
            path2: "/job/insert",
            element2: <JobInsert />,
            show2: false,
          },
          {
            icon2: <UserIcon {...icon} />,
            name2: "job insert",
            path2: "/job/update",
            element2: <JobUpdate />,
            show2: false,
          },
        ],
      },
    ],
  },
  {
    title: "auth pages",
    token:false,
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
