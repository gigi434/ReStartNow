import React, { useState } from 'react'
import Radio from '@mui/material/Radio'
interface RadioButtonProps {
  color: 'primary'
  disabled: boolean
  size: 'small' | 'medium'
  value: string
  name: string
  onClick?: () => void
}

export function RadioButton({
  color = 'primary',
  disabled,
  size = 'medium',
  value,
  name,
  ...props
}: RadioButtonProps) {
  const [selectedValue, setSelectedValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

  return (
    <Radio
      onChange={handleChange}
      checked={selectedValue === value}
      value={value}
      name={name}
      inputProps={{ 'aria-label': 'A' }}
      size={size}
      disabled={disabled}
      color={color}
    />
  )
}
