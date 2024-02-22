/* eslint-disable react/jsx-max-props-per-line */
import React from "react";
import { IconButton } from "rsuite";
// Import the default CSS
import "rsuite/dist/rsuite.min.css";

export const CallBackIconButton = ({ Icon, callback, color }) => {
  const ButtonStyle = { margin: "10px" };
  return (
    <IconButton
      icon={Icon}
      color={color}
      appearance="primary"
      style={ButtonStyle}
      onClick={callback}
    />
  );
};
