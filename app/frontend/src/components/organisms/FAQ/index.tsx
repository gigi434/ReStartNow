import * as React from 'react'
import { CustomAccordion } from '@/src/components'
import { Stack, Typography, Box } from '@mui/material'
export function FAQ() {
  const faqList = [
    {
      summaryContent:
        '離職してから、いつまでに助成金を申請すればいいのでしょうか？',
      detailsContent:
        '助成金によって異なりますが、多くの場合、助成金の支給期間内に申請する必要があります。詳しい期限は各助成金の公式サイト等で確認してください。',
    },
    {
      summaryContent:
        '離職理由が会社都合でない場合でも、助成金はもらえるのでしょうか？',
      detailsContent:
        '助成金によって異なりますが、一部の助成金では会社都合での離職でも支給される場合があります。ただし、詳細は各助成金の公式サイト等で確認してください。',
    },
    {
      summaryContent: '助成金の申請手続きはどのようにすればいいのでしょうか？',
      detailsContent:
        '助成金によって異なりますが、基本的には各助成金の公式サイト等で申請書をダウンロードし、必要事項を記入して提出する必要があります。具体的な手続きについては、各助成金の公式サイト等で確認してください。',
    },
    {
      summaryContent: '申請時に必要な書類は何ですか？',
      detailsContent:
        '助成金によって異なりますが、多くの場合、離職証明書や住民票などが必要となります。具体的に必要な書類については、各助成金の公式サイト等で確認してください。',
    },
    {
      summaryContent:
        'このサイトで検索できる助成金以外にも、知っておいた方がいい助成金はありますか？',
      detailsContent:
        '助成金によって異なりますが、基本的には各助成金の公式サイト等で申請書をダウンロードし、必要事項を記入して提出する必要があります。具体的な手続きについては、各助成金の公式サイト等で確認してください。',
    },
  ]
  return (
    <Stack spacing={2}>
      <Typography
        variant="h5"
        fontWeight={'bold'}
        sx={{
          fontSize: {
            xs: '1.125rem',
            sm: '1.25rem',
            md: '1.5rem',
          },
        }}
      >
        よくある質問
      </Typography>
      {/* Accordion同士の間隔をなくす */}
      <Box p={2}>
        {faqList.map((faqItem, index) => (
          <CustomAccordion
            key={`faqItem-${index}`}
            summaryContent={faqItem.summaryContent}
            detailsContent={faqItem.detailsContent}
            id={index}
          />
        ))}
      </Box>
    </Stack>
  )
}
