import PropTypes from "prop-types";
import React from "react";
import { Svg, Path, G, Defs, Rect, ClipPath } from "react-native-svg";

const Plus = ({ size = 19, color = "white", style }) => {
  return (
    <Svg style={style} width={size} height={size} viewBox="0 0 19 19" fill="none">
      <G clip-path="url(#clip0_10_56)">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.91736 12.2266C2.55929 11.3622 2.375 10.4357 2.375 9.5C2.375 7.61033 3.12567 5.79806 4.46186 4.46186C5.79806 3.12567 7.61033 2.375 9.5 2.375C11.3897 2.375 13.2019 3.12567 14.5381 4.46186C15.8743 5.79806 16.625 7.61033 16.625 9.5C16.625 10.4357 16.4407 11.3622 16.0826 12.2266C15.7246 13.0911 15.1998 13.8765 14.5381 14.5381C13.8765 15.1998 13.0911 15.7246 12.2266 16.0826C11.3622 16.4407 10.4357 16.625 9.5 16.625C8.56433 16.625 7.63783 16.4407 6.77338 16.0826C5.90894 15.7246 5.12348 15.1998 4.46186 14.5381C3.80025 13.8765 3.27542 13.0911 2.91736 12.2266ZM10.25 7.125C10.25 6.71079 9.91421 6.375 9.5 6.375C9.08579 6.375 8.75 6.71079 8.75 7.125V8.75H7.125C6.71079 8.75 6.375 9.08579 6.375 9.5C6.375 9.91421 6.71079 10.25 7.125 10.25H8.75V11.875C8.75 12.2892 9.08579 12.625 9.5 12.625C9.91421 12.625 10.25 12.2892 10.25 11.875V10.25H11.875C12.2892 10.25 12.625 9.91421 12.625 9.5C12.625 9.08579 12.2892 8.75 11.875 8.75H10.25V7.125Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_10_56">
          <Rect width="19" height="19" fill={color} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

Plus.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};

export default Plus;
