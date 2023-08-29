// import { useState, useEffect } from 'react';
// import { throttle } from '@/lib/throttle';
// export function useViewport() {
//   const [width, setWidth] = useState(window?.innerWidth);
//   const [height, setHeight] = useState(window?.innerHeight);

//   const handleWindowResize = () => {
//     setWidth(window?.innerWidth);
//     setHeight(window?.innerHeight);
//   };

//   useEffect(() => {
//     const handleResize = throttle(handleWindowResize, 200);
//     window?.addEventListener('resize', handleResize);
//     return () => window?.removeEventListener('resize', handleResize);
//   }, []);

//   return { width, height };
// }
