import { FC, MouseEventHandler } from "react";

export interface IChips {
  type: "default" | "success" | "warning" | "alert" | "info";
  className?: string;
  icon?: string;
  text: string;
  textClassName?: string;
  iconClassName?: string;
  fill: "light" | "solid";
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const Chips: FC<IChips> = ({
  className,
  type,
  fill,
  icon,
  text,
  textClassName,
  iconClassName,
  onClick,
}) => {
  return (
    <div
      role="presentation"
      className={`w-fit inline-flex items-center justify-center gap-x-2 bg-grey-200 rounded-lg py-1 px-2 ${
        type === "success" && fill === "light" && "bg-success-50"
      } ${type === "warning" && fill === "light" && "bg-warning-50"} ${
        type === "alert" && fill === "light" && "bg-error-50"
      } ${type === "info" && fill === "light" && "bg-link-100"} ${
        type === "default" && fill === "light" && "bg-grey-200"
      }  ${type === "success" && fill === "solid" && "bg-success-600"} ${
        type === "warning" && fill === "solid" && "bg-warning-500"
      } ${type === "alert" && fill === "solid" && "bg-error-600"} ${
        type === "info" && fill === "solid" && "bg-sky-500"
      } ${type === "default" && fill === "solid" && "bg-grey-800"} ${
        className ?? ""
      }`}
      onClick={onClick}
    >
      {icon && (
        <img
          className={`w-4 h-4 ${iconClassName ?? ""}`}
          src={icon}
          alt={text}
        />
      )}
      <p
        className={`${
          type === "success" && fill === "light" && "text-success-600"
        } ${type === "warning" && fill === "light" && "text-warning-500"} ${
          type === "alert" && fill === "light" && "text-error-600"
        } ${type === "info" && fill === "light" && "text-link-500"} ${
          type === "default" && fill === "light" && "text-grey-500"
        } ${type === "success" && fill === "solid" && "text-white"} ${
          type === "warning" && fill === "solid" && "text-white"
        } ${type === "alert" && fill === "solid" && "text-white"} ${
          type === "info" && fill === "solid" && "text-white"
        } ${type === "default" && fill === "solid" && "text-white"} ${
          textClassName ?? ""
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default Chips;
