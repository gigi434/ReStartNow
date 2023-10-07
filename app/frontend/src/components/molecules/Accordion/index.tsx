import React from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiTypography from '@mui/material/Typography'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

const CustomizedAccordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const CustomizedAccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
}))

const CustomizedAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

export interface CustomizedAccordionsProps {
  /**
   * アコーディオンの見出し
   */
  summaryContent: string
  /** アコーディオンの内容 */
  detailsContent: string
  /** エリアコントロールやidなどのアクセシビリティに必要な数値 */
  id: number
}

export function CustomAccordion({
  summaryContent,
  detailsContent,
  id,
}: CustomizedAccordionsProps) {
  return (
    <CustomizedAccordion>
      <CustomizedAccordionSummary
        aria-controls={`panel${id}d-content`}
        id={`panel${id}d-header`}
      >
        <HelpOutlineIcon sx={{ marginRight: '0.5rem' }} />
        <MuiTypography>{summaryContent}</MuiTypography>
      </CustomizedAccordionSummary>
      <CustomizedAccordionDetails>
        <MuiTypography>{detailsContent}</MuiTypography>
      </CustomizedAccordionDetails>
    </CustomizedAccordion>
  )
}
