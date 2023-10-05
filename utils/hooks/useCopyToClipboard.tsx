import { useState } from "react";

import { toastFlashMessage } from "..";

type TCopiedValue = string | null;
type TCopyFn = (text: string) => Promise<boolean>;

const useCopyToClipboard = (): [TCopiedValue, TCopyFn] => {
  const [copiedText, setCopiedText] = useState<TCopiedValue>(null);

  const copy: TCopyFn = async (text) => {
    if (!navigator?.clipboard) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";
      document.body.prepend(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (error) {
        console.error(error);
      } finally {
        textArea.remove();
      }
      toastFlashMessage("Copied to clipboard", "success");
      return false;
    }

    try {
      await navigator?.clipboard?.writeText(text);
      toastFlashMessage("Copied to clipboard", "success");
      setCopiedText?.(text);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
};

export { useCopyToClipboard };
