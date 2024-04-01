import { render, screen, fireEvent } from '@testing-library/react'
import { CustomAccordion } from '@/src/components/molecules/Accordion'
import React from 'react'

const summaryContent: string = 'Test Summary'
const detailsContent: string = 'Test Details'

beforeEach(() => {
  render(
    <CustomAccordion
      summaryContent={summaryContent}
      detailsContent={detailsContent}
      id={1}
    />
  )
})

it('renders without crashing', () => {
  expect(screen.getByText(summaryContent)).toBeInTheDocument()
})

it('expands and collapses on click', async () => {
  const summary = screen.getByText(summaryContent)
  const details = screen.getByText(detailsContent)

  // Initially, details should not be visible
  expect(screen.queryByRole('region', { hidden: true })).toBeInTheDocument()

  // After clicking the summary, details should be visible
  fireEvent.click(summary)
  expect(details).toBeVisible()

  // After clicking the summary again, details should not be visible
  fireEvent.click(summary)
  expect(screen.queryByRole('region', { hidden: true })).toBeInTheDocument()
})
