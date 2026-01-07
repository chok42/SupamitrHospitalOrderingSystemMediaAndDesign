import { toThaiDateTimeString } from "@/helpers/format";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from "@material-tailwind/react";

export function JobHsitoryTimeline({ itemHistory = [] }) {
  return (
    <div className="w-full h-[40vh]  overflow-scroll">
      <Timeline>
        {itemHistory.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineConnector />
            <TimelineHeader className="text-[16px] text-black ">
              <TimelineIcon />
              <Typography className="leading-none text-black font-bold">
                {item.name || ""}
              </Typography>
            </TimelineHeader>
            <TimelineBody className="pb-8">
              <Typography className="leading-none text-gray-800">
                {item.detail || ""}
              </Typography>
              {item.creationDate && (
                <Typography className="leading-none text-gray-800">
                  {toThaiDateTimeString(item.creationDate)}
                </Typography>
              )}
            </TimelineBody>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
