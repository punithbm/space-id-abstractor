import banner from "../../public/assets/images/banner.png";
import copyGrey from "../../public/assets/images/copy_grey.svg";
import closeGrey from "../../public/assets/images/close_grey.svg";
import toastSuccessIcon from "../../public/assets/images/toast_success_icon.svg";
import redirectGrey from "../../public/assets/images/redirect_grey.svg";
import redirectWhite from "../../public/assets/images/redirect_white.svg";
import backGrey from "../../public/assets/images/back_grey.svg";
import imagePlaceholder from "../../public/assets/images/placeholder.jpeg"
export type TImages =
  | "banner"
  | "copyGrey"
  | "closeGrey"
  | "toastSuccessIcon"
  | "redirectGrey"
  | "redirectWhite"
  | "backGrey" 
  | "imagePlaceholder";

export type TNextImage = {
  src: string;
  height: number;
  width: number;
};

export const icons: Record<TImages, TNextImage> = {
  banner,
  copyGrey,
  closeGrey,
  toastSuccessIcon,
  redirectGrey,
  backGrey,
  redirectWhite,
  imagePlaceholder
};
