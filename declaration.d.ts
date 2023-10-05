declare module "*.scss" {
  const content: any;
  export default content;
}
declare module "*.png" {
  const content: any;
  export default content;
}
declare module "*.svg" {
  const content: any;
  export default content;
}
declare module "*.jpeg" {
  const content: any;
  export default content;
}

declare module "*.gif" {
  const content: any;
  export default content;
}
declare module "*.jpg" {
  const content: any;
  export default content;
}

type TGlobalPageProps<T, U> = {
  params: T;
  searchParams: U;
};

type TDotPrefix<T extends string> = T extends "" ? "" : `.${T}`;
type TDotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${TDotPrefix<
          TDotNestedKeys<T[K]>
        >}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;
