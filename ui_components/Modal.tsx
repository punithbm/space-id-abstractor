"use client";
import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";

interface IModalProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  children: React.ReactNode;
  header: React.ReactNode;
  className?: string;
  headerClassName?: string;
}
const Modal: FC<IModalProps> = ({
  openModal,
  setOpenModal,
  children,
  header,
  className,
  headerClassName,
}) => {
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <Transition appear show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-[6px]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full overflow-hidden border bg-white p-6 text-left align-middle transition-all xl:w-[780px] ${
                  className ?? ""
                }`}
              >
                <div className={`mb-10 ${headerClassName ?? ""}`}>{header}</div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
