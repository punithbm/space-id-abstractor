import { FC, MouseEvent } from "react";

export interface IButtonProps {
  label?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<IButtonProps> = ({
  label,
  disabled,
  children,
  className,
  type,
  onClick,
  ...props
}: IButtonProps) => {
  return (
    <button
      type={type}
      className={`${className ? className : ""
        }  relative flex items-center justify-center gap-2 rounded-3xl  px-12 py-3 duration-300 ease-in-out`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {label ?? children ?? null}
    </button>
  );
};

export default Button;
