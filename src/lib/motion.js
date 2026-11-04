// Shared motion tokens so every section eases and paces the same way.

// Long, soft "expo out" curve used for reveals and page transitions
export const EASE_OUT = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

export const DURATION = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
};

// Spring used for scroll-linked values (parallax, progress bars)
export const SCROLL_SPRING = { stiffness: 120, damping: 30, restDelta: 0.001 };

// Offsets for each Reveal direction
export const REVEAL_FROM = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: -48 },
  right: { x: 48 },
  scale: { scale: 0.94 },
  none: {},
};

// Deterministic pseudo-random generator, so decorative particles keep the
// same positions across re-renders instead of jumping around
export function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
