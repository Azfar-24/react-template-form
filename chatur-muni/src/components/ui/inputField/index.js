import React from "react";
import { TextField } from "@mui/material";

const InputField = ({
  variant = "outlined",
  themeType = "primary",
  type = "text",
  size = "medium",
  registerFunc,
  id,
  error = false,
  helperText = "",
  ...rest
}) => {
  const registerProps = registerFunc ? registerFunc(id) : {};

  return (
    <TextField
      variant={variant}
      type={type}
      size={size}
      color={themeType}
      error={error}
      helperText={helperText}
      fullWidth
      {...registerProps}
      {...rest}
    />
  );
};

export default InputField;
