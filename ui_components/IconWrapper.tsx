import { FC, MouseEvent } from "react";

export interface IIconWrapperPropsType {
  icon: string;
  alt: string;
  className?: string;
  iconClassName?: string;
  onClick?: (e?: MouseEvent<HTMLDivElement>) => void;
}

const IconWrapper: FC<IIconWrapperPropsType> = ({
  icon,
  alt,
  className,
  iconClassName,
  onClick,
}: IIconWrapperPropsType) => {
  return (
    <div
      role={"presentation"}
      className={`relative h-12 w-12 cursor-pointer rounded-full p-2 ${
        className ?? ""
      }`}
      onClick={onClick}
    >
      <img
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
          iconClassName ?? ""
        }`}
        src={icon}
        alt={alt}
      />
    </div>
  );
};
export default IconWrapper;
