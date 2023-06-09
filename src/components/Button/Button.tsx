import classNames from "classnames";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import * as React from "react";

export interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string | Url;
}

export default function Button({
  children,
  className,
  onClick,
  href,
}: IButtonProps) {
  const Tag = onClick ? "button" : Link;
  return (
    <Tag
      onClick={onClick || undefined}
      href={href as Url}
      className={classNames(
        "min-h-[40px] shadow-[0px_0px_7px_rgba(0,_0,_0,_0.293139] rounded-md bg-white dark:bg-dark-gray-400",
        className
      )}
    >
      {children}
    </Tag>
  );
}
