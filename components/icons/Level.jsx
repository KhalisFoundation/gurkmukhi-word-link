import React from "react";
import PropTypes from "prop-types";
import Svg, { Path, ClipPath, Rect, Defs, G } from "react-native-svg";

const Level = ({ size = 28, color = "white", style }) => {
  return (
    <Svg style={style} width={size + 1} height={size} viewBox="0 0 29 28" fill="none">
      <G clipPath="url(#clip0_3_6)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.25 3.30601C11.272 2.19801 7.572 0.840007 3.492 0.358007C1.848 0.164007 0.5 1.52001 0.5 3.17601V19.176C0.5 20.834 1.854 22.154 3.484 22.45C7.164 23.118 10.226 24.882 12.18 26.278C12.508 26.512 12.87 26.688 13.25 26.81V3.30601ZM15.75 26.81C16.13 26.69 16.49 26.512 16.818 26.28C18.772 24.884 21.834 23.118 25.516 22.45C27.146 22.154 28.5 20.834 28.5 19.176V3.17601C28.5 1.52001 27.152 0.164007 25.508 0.360007C21.428 0.844007 17.728 2.20001 15.75 3.30801V26.812V26.81Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3_6">
          <Rect width={size} height={size} fill={color} transform="translate(0.5)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

Level.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};

export default Level;
