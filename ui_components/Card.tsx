import { FC, MouseEventHandler } from "react";

export interface ICardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: MouseEventHandler<HTMLDivElement> | undefined;
  onMouseLeave?: MouseEventHandler<HTMLDivElement> | undefined;
}

const Card: FC<ICardProps> = ({
  children,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ICardProps) => {
  return (
    <div
      className={`bg-secondary-200 relative w-full rounded-2xl p-6 ${
        className ?? ""
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="presentation"
    >
      {children}
    </div>
  );
};

export default Card;
