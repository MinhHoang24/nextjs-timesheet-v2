'use client';

import React from "react";

type OverlayProps = {
  isOpenOverlay: boolean;
  onClick?: () => void;
};

const Overlay: React.FC<OverlayProps> = ({ isOpenOverlay, onClick }) => {
  if (!isOpenOverlay) return null;

  return <div className="fixed top-0 left-0 w-full h-full bg-[#00000066] z-[99]" onClick={onClick}></div>;
};

export default Overlay;