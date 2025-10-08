'use client';

import React from "react";
import Overlay from "../overlay/Overlay";
import RippleButton from "../buttons/RippleButton";

type PanelProps = {
  isOpenPanel: boolean;
  onClose: () => void;
  children: React.ReactNode;
  panelHeader: string;
  onClick?: () => void;
};

const Panel: React.FC<PanelProps> = ({
  isOpenPanel,
  onClose,
  children,
  panelHeader,
  onClick,
}) => {
  return (
    <>
      <Overlay isOpenOverlay={isOpenPanel} onClick={onClose} />
        <div className=
          {`fixed bg-white z-[100] top-[100px] left-[330px] p-[24px] rounded-[4px] w-3/5 h-fit box-border overflow-auto outline-none shadow-[0_11px_15px_-7px_rgba(0,_0,_0,_0.2),_0_24px_38px_3px_rgba(0,_0,_0,_0.14),_0_9px_46px_8px_rgba(0,_0,_0,_0.12)]
          ${isOpenPanel ? 'block' : 'hidden'}`} >
          <h1 className="panel-header w-full mb-10 font-medium text-xl">
            {panelHeader}
          </h1>

          <div>
            {children}
            </div>
          
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
              onClick={onClick}
            />
          </div>
        </div>
    </>
  );
};

export default Panel;