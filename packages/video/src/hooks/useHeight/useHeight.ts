import {useEffect, useState} from "react";

export default function useHeight(): string {
  const [height, setHeight] = useState(
    window.innerHeight * (window.visualViewport?.scale || 1),
  );

  useEffect(() => {
    const onResize = (): void => {
      setHeight(window.innerHeight * (window.visualViewport?.scale || 1));
    };

    window.addEventListener("resize", onResize);
    return (): void => {
      window.removeEventListener("resize", onResize);
    };
  });

  return `${height}px`;
}
