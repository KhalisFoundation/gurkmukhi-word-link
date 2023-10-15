import React from "react";
import PropTypes from "prop-types";
import { Svg, Path, G, Defs, Rect, ClipPath } from "react-native-svg";

const Help = ({ size = 30, color = "white", style }) => {
  return (
    <Svg style={style} width={size} height={size} viewBox="0 0 30 30">
      <G clip-path="url(#clip0_19_159)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.0312 1.76751C13.6073 1.44985 14.2504 1.27324 14.9079 1.25217C15.5654 1.23109 16.2185 1.36615 16.8138 1.64626L17.0512 1.76751L25.52 6.76126L25.64 6.84001L25.755 6.93626L25.8888 7.03001C26.3232 7.35577 26.6873 7.76595 26.9592 8.23595C27.2312 8.70594 27.4053 9.22603 27.4712 9.76501L27.4938 10.0175L27.5 10.2725V19.3775C27.5 20.76 26.7875 22.0388 25.6825 22.7438L25.47 22.8688L16.9662 28.2463C15.8188 28.8763 14.4425 28.915 13.2113 28.3313L12.9663 28.2063L4.5975 22.91C4.00185 22.5843 3.49809 22.1135 3.13295 21.5412C2.7678 20.9689 2.5531 20.3137 2.50875 19.6363L2.5 19.3775V10.2713C2.5 8.88876 3.2125 7.61126 4.345 6.89001L13.0312 1.76751ZM15 18.75C14.6938 18.7501 14.3983 18.8625 14.1695 19.0659C13.9407 19.2694 13.7946 19.5497 13.7587 19.8538L13.75 20L13.7587 20.1588C13.7949 20.4626 13.9412 20.7426 14.17 20.9457C14.3987 21.1489 14.694 21.2611 15 21.2611C15.306 21.2611 15.6013 21.1489 15.83 20.9457C16.0588 20.7426 16.2051 20.4626 16.2413 20.1588L16.25 20.0125L16.2413 19.8538C16.2054 19.5497 16.0593 19.2694 15.8305 19.0659C15.6017 18.8625 15.3062 18.7501 15 18.75ZM16.71 10.4088C15.9617 10.0262 15.1061 9.90794 14.2821 10.0731C13.4581 10.2384 12.7142 10.6773 12.1713 11.3188C11.9642 11.5613 11.8577 11.8737 11.8735 12.1922C11.8892 12.5106 12.0261 12.811 12.2561 13.0319C12.4861 13.2528 12.7917 13.3774 13.1106 13.3803C13.4294 13.3832 13.7373 13.2642 13.9713 13.0475L14.185 12.8225C14.3694 12.6532 14.6013 12.5445 14.8493 12.511C15.0974 12.4775 15.3498 12.5208 15.5725 12.635C15.8126 12.7565 16.0071 12.9523 16.127 13.1932C16.247 13.4341 16.286 13.7073 16.2382 13.9721C16.1905 14.2369 16.0585 14.4793 15.862 14.6631C15.6655 14.847 15.4149 14.9625 15.1475 14.9925L14.8575 15.0075C14.5396 15.0425 14.2471 15.198 14.0404 15.4421C13.8337 15.6861 13.7284 16.0001 13.7461 16.3195C13.7639 16.6388 13.9034 16.9392 14.136 17.1588C14.3685 17.3784 14.6764 17.5005 14.9963 17.5C15.8395 17.5025 16.6591 17.2208 17.3225 16.7002C17.9859 16.1796 18.4545 15.4506 18.6526 14.6309C18.8507 13.8112 18.7667 12.9487 18.4142 12.1826C18.0618 11.4165 17.4614 10.7916 16.71 10.4088Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_19_159">
          <Rect width={size} height={size} fill={color} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

Help.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};

export default Help;