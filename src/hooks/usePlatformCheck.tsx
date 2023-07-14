import { useEffect, useState } from "react";

enum PlatformsEnum {
  pc = "pc",
  tablet = "tablet",
  mobile = "mobile",
}

export const usePlatformCheck = (type: keyof typeof PlatformsEnum) => {
  const [width, setWindowWidth] = useState(0);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const platform = () => {
    if (width <= 425) return PlatformsEnum.mobile;
    if (width <= 1023) return PlatformsEnum.tablet;
    return PlatformsEnum.pc;
  };

  return platform() === PlatformsEnum[type];
};
