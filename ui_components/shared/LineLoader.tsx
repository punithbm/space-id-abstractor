import { FC } from "react";

const LineLoader: FC = () => {
  return (
    <div className="lineLoader absolute left-1/2 top-0 z-30 h-[3px] w-[97%] -translate-x-1/2 overflow-hidden rounded-2xl before:absolute before:-left-1/2 before:h-[3px] before:w-[40%] before:rounded-2xl before:bg-primary-main before:content-['']"></div>
  );
};

export default LineLoader;
