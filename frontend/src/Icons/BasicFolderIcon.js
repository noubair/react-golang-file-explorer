import * as React from "react";

function SvgBasicFolderIcon(props) {
  return (
    <svg
      className="baisc-folder-icon_svg__icon"
      height={512}
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path
        d="M0 195.584h962.56c33.792 0 61.44 27.648 61.44 61.44V906.24c0 33.792-27.648 61.44-61.44 61.44H61.44C27.648 967.68 0 940.032 0 906.24V195.584z"
        fill="#006d04"
      />
      <path
        d="M0 107.52c0-22.528 18.432-40.96 40.96-40.96h313.344c16.384 0 30.72 6.144 43.008 17.408L512 195.584H0V107.52z"
        fill="#459447"
      />
    </svg>
  );
}

export default SvgBasicFolderIcon;
