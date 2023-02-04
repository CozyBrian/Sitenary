import React, { RefObject, useEffect, useState } from "react";

const useElementScroll = (ref: RefObject<HTMLElement>) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const element = ref.current;
    const updatePosition = () => {
      setScrollPosition(element?.scrollTop || 0);
    };
    element?.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => element?.removeEventListener("scroll", updatePosition);
  }, [ref]);

  return scrollPosition;
};

export default useElementScroll;
