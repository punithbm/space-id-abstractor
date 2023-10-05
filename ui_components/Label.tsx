import { FC, MouseEventHandler } from "react";

export interface ILabel {
  type: "default" | "success" | "warning" | "alert" | "info";
  className?: string;
  icon?: string;
  rightIcon?: string;
  name?: string;
  text: string | number;
  textClassName?: string;
  iconClassName?: string;
  fill: "light" | "solid";
  variant: "light" | "dark";
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const Label: FC<ILabel> = ({
  className,
  type,
  fill,
  icon,
  text,
  textClassName,
  iconClassName,
  onClick,
  rightIcon,
  name,
  variant,
}) => {
  const styleMap = {
    light: {
      success: {
        bg: "bg-success-50",
        text: "text-success-600",
      },
      warning: {
        bg: "bg-warning-50",
        text: "text-warning-500",
      },
      alert: {
        bg: "bg-error-50",
        text: "text-error-600",
      },
      info: {
        bg: "bg-link-100",
        text: "text-link-500",
      },
      default: {
        bg: "bg-grey-200",
        text: "text-grey-500",
      },
    },
    solid: {
      success: {
        bg: "bg-success-600",
        text: "text-white",
      },
      warning: {
        bg: "bg-warning-500",
        text: "text-white",
      },
      alert: {
        bg: "bg-error-600",
        text: "text-white",
      },
      info: {
        bg: "bg-link-500",
        text: "text-white",
      },
      default: {
        bg: "bg-grey-800",
        text: "text-white",
      },
    },
  };

  const getCSSStyle = (
    type: "default" | "success" | "warning" | "alert" | "info",
    fill: "light" | "solid",
    variant: "light" | "dark"
  ) => {
    const style =
      styleMap[fill as "light" | "solid"][
        type as "default" | "success" | "warning" | "alert" | "info"
      ];

    if (fill === "solid" && type === "success" && variant === "dark") {
      style.bg = `border border-${type}-600 bg-${type}-600/20`;
      style.text = `text-${type}-600`;
    }

    return style;
  };

  const { bg: bgStyle, text: textStyle } = getCSSStyle(type, fill, variant);

  return (
    <div
      role="presentation"
      className={`inline-flex w-fit items-center justify-center gap-x-1 rounded-lg px-2 py-1 ${bgStyle} ${
        className ?? ""
      }`}
      onClick={onClick}
    >
      {icon && (
        <img
          className={`h-4 w-4 ${iconClassName ?? ""}`}
          src={icon}
          alt={name ?? ""}
        />
      )}
      <p
        className={`supportText_regular capitalize ${textStyle} ${
          textClassName ?? ""
        }`}
      >
        {text}
      </p>
      {rightIcon && (
        <img
          className={`h-4 w-4 ${iconClassName ?? ""}`}
          src={rightIcon}
          alt={rightIcon}
        />
      )}
    </div>
  );
};

export default Label;
