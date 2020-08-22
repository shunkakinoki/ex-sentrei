import styled from "@emotion/styled";

import mediaqueries from "@narative/gatsby-theme-novela/src/styles/media";
import * as React from "react";

// This should be the black color, but the difference not noticable, so I avoided shadowing a component.
// fill="#231f20"

const Logo = (): JSX.Element => (
  <LogoContainer>
    <svg
      className="Logo__Desktop"
      height="42"
      width="186"
      version="1.1"
      viewBox="0 0 500 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="linearGradient196"
          x2="1"
          gradientTransform="matrix(0,628.28,628.28,0,2679.4,6684.9)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8cd7bd" offset="0" />
          <stop stopColor="#8cd7bd" offset=".005618" />
          <stop stopColor="#37bba6" offset=".5" />
          <stop stopColor="#00a287" offset="1" />
        </linearGradient>
        <linearGradient
          id="linearGradient206"
          x2="1"
          gradientTransform="matrix(0,628.28,628.28,0,3285.1,6684.9)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7a6bbc" offset="0" />
          <stop stopColor="#6155ae" offset=".30303" />
          <stop stopColor="#332b75" offset="1" />
        </linearGradient>
        <linearGradient
          id="linearGradient220"
          x2="1"
          gradientTransform="matrix(0,489.39,489.39,0,2746.4,6505.9)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#55b5cc" offset="0" />
          <stop stopColor="#55b5cc" offset=".011236" />
          <stop stopColor="#0799be" offset=".5" />
          <stop stopColor="#137c88" offset=".99438" />
          <stop stopColor="#137c88" offset="1" />
        </linearGradient>
        <linearGradient
          id="linearGradient230"
          x2="1"
          gradientTransform="matrix(210.01,0,0,-210.01,2980.3,7154.2)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8e44a2" offset="0" />
          <stop stopColor="#882a98" offset=".52116" />
          <stop stopColor="#6e2090" offset="1" />
        </linearGradient>
        <linearGradient
          id="linearGradient238"
          x2="1"
          gradientTransform="matrix(0,489.39,489.39,0,3220.2,6505.9)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1574c4" offset="0" />
          <stop stopColor="#413d75" offset="1" />
        </linearGradient>
        <linearGradient
          id="linearGradient252"
          x2="1"
          gradientTransform="matrix(229.06,0,0,-229.06,2751.2,7154.2)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#137c88" offset="0" />
          <stop stopColor="#137c88" offset=".0056181" />
          <stop stopColor="#0799be" offset=".5" />
          <stop stopColor="#55b5cc" offset=".98876" />
          <stop stopColor="#55b5cc" offset="1" />
        </linearGradient>
        <linearGradient
          id="linearGradient260"
          x2="1"
          gradientTransform="matrix(0,604.34,604.34,0,2978.1,6505.9)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#413d75" offset="0" />
          <stop stopColor="#2e3191" offset="1" />
        </linearGradient>
      </defs>
      <g
        transform="matrix(.13333 0 0 -.13333 -335.02 975.09)"
        fillRule="evenodd"
      >
        <path
          d="m2846.2 6995.3-94.95 317.93-238.61-628.28"
          fill="url(#linearGradient196)"
        />
        <path
          d="m3460.2 6684.9-269.89 628.28-80.3-317.93z"
          fill="url(#linearGradient206)"
        />
        <path
          d="m2846.2 6995.3c-167.66-153.03-333.56-310.35-333.56-310.35l467.66-179.04-134.1 489.39"
          fill="url(#linearGradient220)"
        />
        <path
          d="m2980.3 7110.2 129.71-114.95 80.3 317.93z"
          fill="url(#linearGradient230)"
        />
        <path
          d="m3110 6995.3 350.19-310.35-479.9-179.04z"
          fill="url(#linearGradient238)"
        />
        <path
          d="m2751.2 7313.2 229.05-202.98c-42.62-39.3-88.44-73.25-134.1-114.95l-94.95 317.93"
          fill="url(#linearGradient252)"
        />
        <path
          d="m2980.3 7110.2 129.71-114.95-129.71-489.39-134.1 489.39c45.66 41.7 91.48 75.65 134.1 114.95"
          fill="url(#linearGradient260)"
        />
      </g>
    </svg>

    <svg
      className="Logo__Mobile"
      height="42"
      width="186"
      version="1.1"
      viewBox="0 0 500 122"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="linearGradient196m"
          x2="1"
          gradientTransform="matrix(0,628.28,628.28,0,2679.4,6684.9)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8cd7bd" offset="0" />
          <stop stopColor="#8cd7bd" offset=".005618" />
          <stop stopColor="#37bba6" offset=".5" />
          <stop stopColor="#00a287" offset="1" />
        </linearGradient>
        <linearGradient
          id="linearGradient206m"
          x2="1"
          gradientTransform="matrix(0,628.28,628.28,0,3285.1,6684.9)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7a6bbc" offset="0" />
          <stop stopColor="#6155ae" offset=".30303" />
          <stop stopColor="#332b75" offset="1" />
        </linearGradient>
        <linearGradient
          id="linearGradient220m"
          x2="1"
          gradientTransform="matrix(0,489.39,489.39,0,2746.4,6505.9)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#55b5cc" offset="0" />
          <stop stopColor="#55b5cc" offset=".011236" />
          <stop stopColor="#0799be" offset=".5" />
          <stop stopColor="#137c88" offset=".99438" />
          <stop stopColor="#137c88" offset="1" />
        </linearGradient>
        <linearGradient
          id="linearGradient230m"
          x2="1"
          gradientTransform="matrix(210.01,0,0,-210.01,2980.3,7154.2)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8e44a2" offset="0" />
          <stop stopColor="#882a98" offset=".52116" />
          <stop stopColor="#6e2090" offset="1" />
        </linearGradient>
        <linearGradient
          id="linearGradient238m"
          x2="1"
          gradientTransform="matrix(0,489.39,489.39,0,3220.2,6505.9)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1574c4" offset="0" />
          <stop stopColor="#413d75" offset="1" />
        </linearGradient>
        <linearGradient
          id="linearGradient252m"
          x2="1"
          gradientTransform="matrix(229.06,0,0,-229.06,2751.2,7154.2)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#137c88" offset="0" />
          <stop stopColor="#137c88" offset=".0056181" />
          <stop stopColor="#0799be" offset=".5" />
          <stop stopColor="#55b5cc" offset=".98876" />
          <stop stopColor="#55b5cc" offset="1" />
        </linearGradient>
        <linearGradient
          id="linearGradient260m"
          x2="1"
          gradientTransform="matrix(0,604.34,604.34,0,2978.1,6505.9)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#413d75" offset="0" />
          <stop stopColor="#2e3191" offset="1" />
        </linearGradient>
      </defs>
      <g
        transform="matrix(.13333 0 0 -.13333 -335.02 975.09)"
        fillRule="evenodd"
      >
        <path
          d="m2846.2 6995.3-94.95 317.93-238.61-628.28"
          fill="url(#linearGradient196m)"
        />
        <path
          d="m3460.2 6684.9-269.89 628.28-80.3-317.93z"
          fill="url(#linearGradient206m)"
        />
        <path
          d="m2846.2 6995.3c-167.66-153.03-333.56-310.35-333.56-310.35l467.66-179.04-134.1 489.39"
          fill="url(#linearGradient220m)"
        />
        <path
          d="m2980.3 7110.2 129.71-114.95 80.3 317.93z"
          fill="url(#linearGradient230m)"
        />
        <path
          d="m3110 6995.3 350.19-310.35-479.9-179.04z"
          fill="url(#linearGradient238m)"
        />
        <path
          d="m2751.2 7313.2 229.05-202.98c-42.62-39.3-88.44-73.25-134.1-114.95l-94.95 317.93"
          fill="url(#linearGradient252m)"
        />
        <path
          d="m2980.3 7110.2 129.71-114.95-129.71-489.39-134.1 489.39c45.66 41.7 91.48 75.65 134.1 114.95"
          fill="url(#linearGradient260m)"
        />
      </g>
    </svg>
  </LogoContainer>
);

export default Logo;

const LogoContainer = styled.div`
  .Logo__Mobile {
    display: none;
  }

  ${mediaqueries.tablet`
    .Logo__Desktop {
      display: none;
    }

    .Logo__Mobile{
      display: block;
    }
  `}
`;
