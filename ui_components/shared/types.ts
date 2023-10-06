import { TNextImage } from "@/utils/images";

export interface ISidebarProps {
  className?: string;
}

export interface ISeparatorProps {
  className?: string;
}
export interface IBreadcrumbProps {
  pages: IPages[];
}
export interface IPages {
  name?: string;
  href?: string;
  active?: boolean;
}
export interface IGlobalSearchProps {
  className?: string;
}

export interface IGlobalSearchProps {
  className?: string;
}

export interface ICopyIconProps {
  icon: TNextImage | string;
  text: string;
  className?: string;
}

export interface INoStateProps {
  img?: string;
  title?: string;
  desc?: string;
  className?: string;
  imgClassName?: string;
}
export interface IWalletConnectedToProps {
  data?: any;
}
