import { SVGProps } from "react";

const UserCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="#2ca9bc"
      d="M10 1a9 9 0 0 0-6.45 15.27 7 7 0 0 1 4.28-3.92 4 4 0 1 1 4.34 0 7 7 0 0 1 4.28 3.92A9 9 0 0 0 10 1"
    />
    <path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 9a4 4 0 1 1-4-4 4 4 0 0 1 4 4m-1.83 3.35a3.95 3.95 0 0 1-4.34 0 7 7 0 0 0-4.28 3.92 9 9 0 0 0 12.81.09l.09-.09a7 7 0 0 0-4.28-3.92M19 10a9 9 0 0 0-9-9h0a9 9 0 0 0-9 9h0a9 9 0 0 0 9 9h0a9 9 0 0 0 9-9"
    />
  </svg>
);
export default UserCircle;

