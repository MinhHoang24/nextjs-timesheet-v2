'use client';

import React from 'react';
import Overlay from '../overlay/Overlay';
import RippleButton from '../buttons/RippleButton';

interface ConfirmModalProps {
  isOpen: boolean;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  message = 'Are you sure you want to continue?',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <Overlay isOpenOverlay={isOpen} onClick={onCancel} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      bg-white p-6 rounded-2xl shadow-lg z-[100] w-[90%] max-w-[400px] text-center">
        <h3 className="text-lg font-semibold mb-3 text-[#333]">Are you sure?</h3>
        <p className="text-sm text-[#666] mb-5">{message}</p>
        <div className="flex justify-center gap-3">
          <RippleButton
            text="Cancel"
            bgBtncolor="#efefef"
            textBtncolor="#555"
            width="fit-content"
            onClick={onCancel}
          />
          <RippleButton
            text="Yes"
            bgBtncolor="#7cd1f9"
            textBtncolor="#fff"
            width="fit-content"
            onClick={onConfirm}
          />
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;