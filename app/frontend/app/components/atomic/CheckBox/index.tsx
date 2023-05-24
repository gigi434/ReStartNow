import React, { useState } from 'react'
import { Checkbox as MuiCheckbox, CheckboxProps } from '@mui/material'

interface CloseButtonProps
  extends Pick<
    CheckboxProps,
    'color' | 'disabled' | 'size' | 'onChange' | 'value'
  > {
  color: 'primary'
  disabled: boolean
  size: 'small' | 'medium'
  value: string
}

export default function Checkbox({
  disabled = false,
  color = 'primary',
  size = 'medium',
  value,
}: CloseButtonProps) {
  const [selectedValue, setSelectedValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }
  return (
    <MuiCheckbox
      color={color}
      disabled={disabled}
      size={size}
      onChange={handleChange}
      checked={selectedValue === value}
      value={value}
    />
  )
}
