import * as React from "react";

function SvgFileIcon(props) {
  return (
    <svg viewBox="0 0 3800 4800" {...props}>
      <path fill="#555" d="M0 4800h3800V840L2960 0H0" />
      <path fill="#888" d="M2960 840h840L2960 0" />
      <path fill="#BBB" d="M3800 1680V840h-840" />
      <g>
        <path
          fill="#EEE"
          d="M900 1976h2000v-212H900m0 670h2000v-211H900m0 670h2000v-212H900m0 635h1200v-176H900"
        />
      </g>
    </svg>
  );
}

export default SvgFileIcon;
