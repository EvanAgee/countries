import classNames from "classnames";
import * as React from "react";

export interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({ children, className, onClick }: IButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "min-h-[40px] shadow-[0px_0px_7px_rgba(0,_0,_0,_0.293139] rounded-md bg-white dark:bg-dark-gray-400",
        className
      )}
    >
      {children}
    </button>
  );
}
