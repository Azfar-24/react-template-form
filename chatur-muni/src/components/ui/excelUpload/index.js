import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

const ExcelUpload = ({
  label = "Upload Excel File",
  maxFileSize = 512000, // Default max size of 500KB
  acceptedFileTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ], // Default accepted types
  fieldName = "excel", // Name for the input field
  fullWidth = true, // If the component should take full width
  registerFunc, // This will be passed from react-hook-form
  errors, // Errors object from react-hook-form to display validation errors
  setValue, // SetValue to manually set the field value
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // For drag-and-drop feedback

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true); // Set dragging state to true
  };

  const handleDragLeave = () => {
    setIsDragging(false); // Reset dragging state on leave
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false); // Reset dragging state on drop
    const file = e.dataTransfer.files[0];
    validateFile(file);
  };

  const validateFile = (file) => {
    if (file) {
      setSelectedFile(file);
      setValue(fieldName, [file]); // Set value as an array
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setValue(fieldName, null); // Clear the value in react-hook-form
  };

  return (
    <Box
      sx={{
        border: `2px dashed ${isDragging ? "#2196f3" : "#ccc"}`,
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        width: fullWidth ? "100%" : "auto",
        backgroundColor: "#f9f9f9",
        cursor: "pointer",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById(fieldName).click()} // Trigger file input click
    >
      {selectedFile ? (
        <Box sx={{ position: "relative" }}>
          <Typography variant="body2">{selectedFile.name}</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRemoveFile}
            sx={{ position: "absolute", top: 5, right: 5 }}
          >
            <CloseIcon fontSize="small" />
          </Button>
          {errors && (
            <Typography color="error">{errors[fieldName]?.message}</Typography>
          )}
        </Box>
      ) : (
        <>
          <Typography variant="body2" color="textSecondary">
            Max file size: {(maxFileSize / 1024).toFixed(0)} KB
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Supported file types: {acceptedFileTypes.join(", ")}
          </Typography>
          {errors && (
            <Typography color="error">{errors[fieldName]?.message}</Typography>
          )}
        </>
      )}

      <TextField
        type="file"
        accept={acceptedFileTypes.join(",")} // Join accepted types for the input
        {...registerFunc(fieldName)} // Registering the input with react-hook-form
        onChange={handleFileChange}
        sx={{ display: "none" }} // Keep the input hidden
        id={fieldName} // Use the field name for the input ID
        error={!!errors[fieldName]}
        helperText={errors[fieldName]?.message}
        fullWidth
      />
    </Box>
  );
};

ExcelUpload.propTypes = {
  label: PropTypes.string,
  maxFileSize: PropTypes.number,
  acceptedFileTypes: PropTypes.array,
  fieldName: PropTypes.string,
  fullWidth: PropTypes.bool,
  registerFunc: PropTypes.func.isRequired,
  errors: PropTypes.object, // to display errors
  setValue: PropTypes.func.isRequired, // react-hook-form setValue
};

export default ExcelUpload;
