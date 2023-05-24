import * as React from 'react'
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'

export default function TextField({
  error,
  helperText = ' ', // helperTextの値がない場合とある場合で要素の高さが異なるため、スペースを格納し高さを揃える
  disabled,
  variant = 'standard',
  id,
  label,
  type,
  required = false,
  defaultValue,
  size = 'medium',
  fullWidth,
  placeholder,
}: MuiTextFieldProps) {
  return (
    <MuiTextField
      id={id}
      label={label}
      variant={variant}
      disabled={disabled}
      type={type}
      required={required}
      defaultValue={defaultValue}
      error={error}
      helperText={error && helperText}
      size={size}
      fullWidth={fullWidth}
      placeholder={placeholder}
    />
  )
}
