import React, { useState } from "react";

interface HoverIconsProps {
  Icon: any;
  size: number;
  innerText: string;
}

const HoverIcon = ({ Icon, size, innerText }: HoverIconsProps) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div
    onMouseEnter={() => setShow(true)}
    onMouseLeave={() => setShow(false)} 
    className="relative">
      <Icon
        className="text-primary-200 cursor-pointer"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
      <h1 className={`bg-background-300 transition-opacity text-text-main p-1 rounded-lg absolute left-0 ${show ? "opacity-100" : "opacity-0"}`}>{innerText}</h1>
    </div>
  );
};

export default HoverIcon;
