import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, Button } from "@mui/material";
import BorderButton from "../../components/ui/borderButton";
import InputField from "../../components/ui/inputField";
import ImgUpload from "../../components/ui/imgUpload";
import ExcelUpload from "../../components/ui/excelUpload";

// Validation schema for mobile number and image
const schema = yup.object().shape({
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),

  image: yup
    .array()
    .required("Logo is required")

    .min(1, "Logo is required") // Ensures at least one file is selected
    .test("fileSize", "File size must be less than 500KB", (value) => {
      return value && value[0] && value[0].size <= 50 * 1024; // Adjust if necessary
    })
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value &&
        value[0] &&
        ["image/jpeg", "image/png", "image/webp"].includes(value[0].type)
      );
    }),

  excel: yup
    .array()
    .required("Excel file is required")

    .min(1, "Excel file is required") // Ensure at least one file is selected
    .test("fileSize", "File size must be less than 500KB", (value) => {
      return value && value[0] && value[0].size <= 500 * 1024; // 500KB max size
    })
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value &&
        value[0] &&
        [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
        ].includes(value[0].type)
      );
    }),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  console.log(errors);

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4" align="center">
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Mobile Number Field */}
        <InputField
          id="mobileNumber"
          label="Mobile Number"
          type="text"
          variant="outlined"
          error={!!errors.mobileNumber}
          helperText={errors.mobileNumber?.message}
          fullWidth
          registerFunc={register}
        />

        <Typography variant="h5" align="center" gutterBottom>
          Upload Image
        </Typography>

        <ImgUpload
          registerFunc={register}
          fieldName="image"
          setValue={setValue}
          errors={errors}
        />

        {/* Excel Upload Field */}
        <Typography variant="h5" align="center" gutterBottom>
          Upload Excel File
        </Typography>
        <ExcelUpload
          registerFunc={register}
          fieldName="excel"
          setValue={setValue}
          errors={errors}
        />

        <BorderButton
          name="Login"
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, width: "100%" }}
        />
      </form>
    </Box>
  );
};

export default Login;
