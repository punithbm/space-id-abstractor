"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "@/store";
import { ACTIONS } from "@/store/GlobalContext";
import { IToastType } from "@/store/reducers/popupStateReducer";
import { TNextImage, icons } from "@/utils/images";

const toastIconConfig: Record<IToastType["toastType"], string> = {
  success: icons.toastSuccessIcon.src,
  warning: icons.toastSuccessIcon.src,
  error: icons.toastSuccessIcon.src,
};
const ToastMessage = () => {
  const {
    state: {
      popupState: { toastLists },
    },
    dispatch,
  } = useContext(GlobalContext);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (toastLists?.length) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [toastLists?.length]);

  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: ACTIONS.CLEAR_TOAST,
    });
  };

  return (
    <>
      {open ? (
        <div
          className={`fixed right-4 bottom-4 z-[9999] rounded-lg bg-primaryGradient`}
        >
          <div className="relative flex items-center p-3 pr-14 md:pr-20">
            <img
              src={toastIconConfig[toastLists[0]?.toastType]}
              alt=""
              className="h-5 w-5 md:h-6 md:w-6"
            />
            <div className="ml-2 md:ml-4">
              <p className="paragraph1_regular text-white">
                {toastLists?.[0]?.message ?? ""}
              </p>
              {toastLists?.[0]?.subtitle ? (
                <p className="paragraph text-text-100 !text-xs leading-5 dark:text-textDark-500 md:!text-sm">
                  {toastLists?.[0]?.subtitle ?? ""}
                </p>
              ) : null}
            </div>
            <Image
              className="absolute right-4 cursor-pointer"
              src={icons.closeGrey}
              alt="close"
              role={"presentation"}
              onClick={() => handleClose()}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ToastMessage;
