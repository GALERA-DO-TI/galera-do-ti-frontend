"use client";

import { useEffect, useRef, useState } from "react";

export function useCarouselIndex<T extends HTMLElement>(count: number) {
  const ref = useRef<T>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const getClosestIndex = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (children.length === 0) return 0;

      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let closestDistance = Infinity;

      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(childCenter - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = i;
        }
      });

      return closest;
    };

    const onScroll = () => setIndex(getClosestIndex());
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count]);

  const scrollTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (!child) return;
    el.scrollTo({
      left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  return { ref, index, scrollTo };
}
