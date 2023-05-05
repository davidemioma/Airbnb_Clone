"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: Props) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-neutral-800/70 overflow-hidden"
        onClick={handleClose}
      />

      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 w-full md:w-4/6 lg:w-3/6 xl:w-2/5">
        <div
          className={`bg-white w-full h-full sm:h-auto rounded-xl shadow-lg transition duration-300 ${
            showModal ? "translate-y-0" : "translate-y-full"
          }
          ${showModal ? "opacity-100" : "opacity-0"}`}
        >
          <div className="w-full h-full flex flex-col">
            <div className="relative flex items-center justify-center p-3 sm:p-5 border-b">
              <button
                className="absolute left-9 hover:opacity-70 transition"
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>

              <h2 className="text-lg font-semibold">{title}</h2>
            </div>

            <div className="relative p-3 px-5 md:p-5 flex-auto">{body}</div>

            <div className="flex flex-col gap-2 py-3 px-5 md:p-5">
              <div className="w-full flex items-center gap-4">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    disabled={disabled}
                    onClick={secondaryAction}
                    label={secondaryActionLabel}
                    outline
                  />
                )}

                <Button
                  disabled={disabled}
                  onClick={handleSubmit}
                  label={actionLabel}
                />
              </div>

              {footer}
            </div>
          </div>
        </div>
        ;
      </div>
    </>
  );
};

export default Modal;
