'use client';

import React from "react";
import './overlay.css';

type OverlayProps = {
  isOpenOverlay: boolean;
  onClick?: () => void;
};

const Overlay: React.FC<OverlayProps> = ({ isOpenOverlay, onClick }) => {
  if (!isOpenOverlay) return null;

  return <div className="overlay" onClick={onClick}></div>;
};

export default Overlay;