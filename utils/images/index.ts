import banner from "../../public/assets/images/banner.png";

export type TImages = "banner";

export type TNextImage = {
  src: string;
  height: number;
  width: number;
};

export const icons: Record<TImages, TNextImage> = {
  banner,
};
