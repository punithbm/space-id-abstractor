import React, { FC } from "react";

import { INoStateProps } from "./types";

const NoState: FC<INoStateProps> = ({
  img,
  title,
  desc,
  className,
  imgClassName,
}) => {
  return (
    <div className={`p-10 text-center ${className ?? ""}`}>
      {img && (
        <img
          className={`mx-auto mb-6 ${imgClassName ?? ""}`}
          src={img}
          alt={"not found"}
        />
      )}
      <p className={`paragraph2_bold px-[90px] text-text-800`}>{title}</p>
      {desc && <p className={`paragraph2_bold mt-4 text-text-800`}>{desc}</p>}
    </div>
  );
};

export default NoState;
