import * as React from "react";
import { motion } from "framer-motion";

export interface IPageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: IPageTransitionProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}
