'use client';

import React from "react";
import Overlay from "../overlay/Overlay";
import RippleButton from "../buttons/RippleButton";

type PanelProps = {
  isOpenPanel: boolean;
  onClose: () => void;
  children: React.ReactNode;
  panelHeader: string;
};

const Panel: React.FC<PanelProps> = ({
  isOpenPanel,
  onClose,
  children,
  panelHeader
}) => {
  return (
    <>
      <Overlay isOpenOverlay={isOpenPanel} onClick={onClose} />
      <div className=
        {`absolute bg-white z-[100] top-[calc(100vh/2)] right-[calc(100vw/2)] transform translate-x-[50%] translate-y-[-150%] p-[24px] rounded-[4px] w-fit h-fit box-border overflow-auto outline-none shadow-[0_11px_15px_-7px_rgba(0,_0,_0,_0.2),_0_24px_38px_3px_rgba(0,_0,_0,_0.14),_0_9px_46px_8px_rgba(0,_0,_0,_0.12)]
        ${isOpenPanel ? 'block' : 'hidden'}`} >
        <h1 className="panel-header w-full mb-5 font-medium text-xl">
          {panelHeader}
        </h1>
        <div>{children}</div>
        <div className="panel-option flex items-center justify-end py-2 px-0 gap-[0.63rem] mt-5">
          <div className="shadow-[0_2px_5px_rgba(0,_0,_0,_0.16),_0_2px_10px_rgba(0,_0,_0,_0.12)] rounded">
            <RippleButton 
              text="Cancel"
              bgBtncolor="#fff"
              textBtncolor="#333"
              onClick={onClose}
            />
          </div>
          <RippleButton 
            text="Save"
            bgBtncolor="#f24b50"
            textBtncolor="#fff"
          />
        </div>
      </div>
    </>
  );
};

export default Panel;