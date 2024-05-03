import { render, fireEvent, screen } from '@testing-library/react'
import { Alert } from '@/src/components/molecules'
import React from 'react'

describe('molecules/Alert', () => {
  const content = 'test content'

  beforeEach(() => {
    render(<Alert />)
  })

  it('should be visible', () => {
    // expect(screen.getByText(content))
  })

  it('should be not visible when clicked onClose callback function', () => {})
})
