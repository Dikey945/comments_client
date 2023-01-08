import React from "react";

interface Props {
  Icon: React.FC;
  isActive?: boolean;
  color?: string;
  children?: React.ReactNode;

}

export const IconBtn: React.FC<Props> = ({
  Icon,
  isActive,
  color,
  children,
  ...props }) => {
  return (
    <button
      className={`btn icon-btn ${isActive ? "icon-btn-active" : ""} ${
        color || ""
      }`}
      {...props}
    >
      <span className={`${children != null ? "mr-1" : ""}`}>
        <Icon />
      </span>
      {children}
    </button>
  )
}
