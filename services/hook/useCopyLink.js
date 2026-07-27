"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { copyTextToClipboard } from "@/lib/copyToClipboard";

const DEFAULT_MESSAGE = "ссылка скопирована";
const DEFAULT_DURATION = 2500;

const useCopyLink = ({
  disabled = false,
  message = DEFAULT_MESSAGE,
  duration = DEFAULT_DURATION,
  getUrl,
} = {}) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showToast = useCallback(() => {
    setIsCopied(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
    }, duration);
  }, [duration]);

  const copyLink = useCallback(
    async (url) => {
      if (disabled) return false;

      const link =
        url ||
        (typeof getUrl === "function" ? getUrl() : undefined) ||
        (typeof window !== "undefined" ? window.location.href : "");

      try {
        await copyTextToClipboard(link);
        showToast();
        return true;
      } catch (error) {
        console.error("Не удалось скопировать ссылку:", error);
        return false;
      }
    },
    [disabled, getUrl, showToast]
  );

  const copyCurrentLink = useCallback(() => copyLink(), [copyLink]);

  return {
    copyLink,
    copyCurrentLink,
    isCopied,
    message,
  };
};

export default useCopyLink;
