import type { SVGProps } from "react";
const SvgCloseButton = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={50}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m5 5 14 14M5 19 19 5"
        />
    </svg>
);
export default SvgCloseButton;