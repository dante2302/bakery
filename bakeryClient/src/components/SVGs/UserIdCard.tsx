import type { SVGProps } from "react";
const SvgUserIdCard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#95a5a6"
      d="M3 5c-1.105 0-2 .9-2 2v11c0 1.1.895 2 2 2h18c1.105 0 2-.9 2-2V7c0-1.1-.895-2-2-2H3"
    />
    <path
      fill="#bdc3c7"
      d="M3 4c-1.105 0-2 .9-2 2v11c0 1.1.895 2 2 2h18c1.105 0 2-.9 2-2V6c0-1.1-.895-2-2-2H3"
    />
    <path fill="#7f8c8d" d="M13 7v1h4V7zm0 2v1h7V9zm0 2v1h7v-1z" />
    <path
      fill="#ecf0f1"
      d="M4 6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z"
    />
    <path
      fill="#34495e"
      d="M7 7.1c-.665 0-1.28.4-1.732.8-.387.5-.61 1-.755 1.6-.422.4-.37 1-.059 1.4.33.4.325.9.576 1.4.104.4.697.7.697 1.1.15.7-.71.5-1.097.7-.54.2-1.246.4-1.628.8.04.6-.11 1.2.125 1.7.2.4.7.4 1.103.4h6.208c.459-.2.621-.8.562-1.2v-1c-.705-.3-1.36-.7-2.14-.9-.462 0-.662-.3-.698-.7.643-.5.983-1.3 1.213-2.1.36-.3.655-1.1.184-1.5-.23-.4-.264-.9-.583-1.4C8.554 7.6 7.8 7.1 7 7.1"
    />
  </svg>
);
export default SvgUserIdCard;

