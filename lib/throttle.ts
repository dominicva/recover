export function throttle(fn: () => void, ms: number) {
  let timer: NodeJS.Timeout | null = null;

  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn();
      }, ms);
    }
  };
}
