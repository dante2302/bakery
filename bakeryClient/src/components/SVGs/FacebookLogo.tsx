import type { SVGProps } from "react";
const SvgFacebookLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={800}
    height={800}
    viewBox="0 0 48 48"
    {...props}
  >
    <path fill="none" d="M0 .006h48v48H0z" />
    <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4m2 35.861V28h5v-4h-5v-3c0-1.103.897-2 2-2h3v-4h-3c-3.309 0-6 2.691-6 6v3h-5v4h5v11.861C14.12 38.872 8 32.144 8 24c0-8.823 7.178-16 16-16s16 7.177 16 16c0 8.144-6.12 14.872-14 15.861" />
  </svg>
);
export default SvgFacebookLogo;
