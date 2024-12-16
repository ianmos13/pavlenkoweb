'use client';
import { usePathname } from "next/navigation";

const useIsPath501 = () => {
  const pathname = usePathname();
  return pathname === "/501";
};

export default useIsPath501;
