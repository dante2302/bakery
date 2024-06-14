import { SVGProps } from "react";

const SvgShoppingBag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 0 64 64"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path fill="#D650C7" d="M9 15h44v48H9z" />
      <circle cx={20} cy={21} r={3} fill="#5B68C0" />
      <circle cx={42} cy={21} r={3} fill="#5B68C0" />
      <path
        stroke="#FFF"
        strokeLinecap="round"
        strokeWidth={2}
        d="M20 21c0 6.075 4.925 11 11 11h0c6.075 0 11-4.925 11-11"
      />
      <path fill="#FF78C7" d="M9 3h44l-2 6 2 6H9l2-6z" />
    </g>
  </svg>
);
export default SvgShoppingBag;

