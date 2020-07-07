// import React, { FC } from "react";

// const Glow: FC = () => {
//   return (
//     <filter
//       id="glow"
//       filterUnits="userSpaceOnUse"
//       x="0"
//       y="0"
//       width="45"
//       height="45"
//     >
//       <feColorMatrix
//         type="matrix"
//         result="color"
//         values="1 0 0 0 0
//                 0 1 0 0 0
//                 0 0 1 0 0
//                 0 0 0 1 0"
//       />
//       <feGaussianBlur in="color" stdDeviation="4" result="blur" />
//       <feOffset in="blur" dx="0" dy="0" result="offset" />
//       <feMerge>
//         <feMergeNode in="bg"></feMergeNode>
//         <feMergeNode in="offset"></feMergeNode>
//       </feMerge>
//     </filter>
//   );
// };

// export { Glow };
