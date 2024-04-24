import type { SVGProps } from "react";
const SvgCandy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#000"
      d="m3 9 .6-.8A1 1 0 0 0 2 9zm0 6H2a1 1 0 0 0 1.6.8zm18-6h1a1 1 0 0 0-1.6-.8zm0 6-.6.8A1 1 0 0 0 22 15zM2.4 9.8l4 3 1.2-1.6-4-3zm4 1.4-4 3 1.2 1.6 4-3zM4 15V9H2v6zm16.4-6.8-4 3 1.2 1.6 4-3zm-4 4.6 4 3 1.2-1.6-4-3zM22 15V9h-2v6zm-6-3a4 4 0 0 1-4 4v2a6 6 0 0 0 6-6zm-8 0a4 4 0 0 1 4-4V6a6 6 0 0 0-6 6zm4-4c2.164 0 4 1.836 4 4h2c0-3.269-2.731-6-6-6zm0 8c-2.164 0-4-1.836-4-4H6c0 3.269 2.731 6 6 6zm3.85-6.765L9.235 15.85l1.415 1.414 6.616-6.616zm-2.5-2.5L6.735 13.35l1.415 1.414 6.616-6.616z"
    />
  </svg>
);
export default SvgCandy;
