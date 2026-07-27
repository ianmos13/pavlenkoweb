"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const useFloatingPosition = (anchorRef, isOpen, offset = 4) => {
  const floatingRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const updatePosition = useCallback(() => {
    if (!anchorRef.current) return;

    const rect = anchorRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom + offset,
      left: rect.left,
      width: rect.width,
    });
  }, [anchorRef, offset]);

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const handleUpdate = () => updatePosition();

    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate);

    return () => {
      window.removeEventListener("scroll", handleUpdate, true);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [isOpen, updatePosition]);

  return { floatingRef, position };
};

export const useClickOutside = (anchorRef, floatingRef, isActive, onClose) => {
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event) => {
      const isInside =
        (anchorRef.current && anchorRef.current.contains(event.target)) ||
        (floatingRef.current && floatingRef.current.contains(event.target));

      if (!isInside) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isActive, onClose, anchorRef, floatingRef]);
};
