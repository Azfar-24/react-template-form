import React from "react";
import { Button } from "@mui/material";

const BorderButton = ({
  name = "",
  themeType = "primary",
  variant = "contained",
  onClick = () => {},
  size = "medium",
  className = "",
  disabled = false,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      color={themeType}
      onClick={onClick}
      size={size}
      className={className}
      disabled={disabled}
      {...rest}
    >
      {name}
    </Button>
  );
};

export default BorderButton;
