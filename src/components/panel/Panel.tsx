'use client';

import React from "react";
import Overlay from "../overlay/Overlay";
import './panel.css';
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
      <div className={`main-panel ${isOpenPanel ? 'open-panel' : ''}`} >
        <h1 className="panel-header">
          {panelHeader}
        </h1>
        <div>{children}</div>
        <div className="panel-option">
          <RippleButton 
            text="Cancel"
            bgBtncolor="#fff"
            textBtncolor="#333"
            onClick={onClose}
          />
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