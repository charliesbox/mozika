import { useLayoutEffect, useState } from "react";
import debounce from "lodash/fp/debounce";
import { getCenter } from "../utils/layout";
import { sizes } from "../utils/style";

const query = `(max-width: ${sizes.mobile}px)`;

export const useMobileDetector = () => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);
  useLayoutEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return media.removeListener(listener);
  });

  return matches;
};

export const useOrigin = () => {
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  useLayoutEffect(() => {
    setOrigin(getCenter(document.body));
    const onResizeCallback = debounce(300, () => {
      setOrigin(getCenter(document.body));
    });
    window.addEventListener("resize", onResizeCallback);
    return window.removeEventListener("resize", onResizeCallback, true);
  }, []);
  return origin;
};

export const useIntersectionObserver = (ref: React.RefObject<HTMLElement>) => {
  const [isIntersection, setIntersection] = useState(false);
  useLayoutEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(([entry]) => {
        setIntersection(entry.isIntersecting);
      });

      observer.observe(ref.current);
    }
  }, []);

  return isIntersection;
};
