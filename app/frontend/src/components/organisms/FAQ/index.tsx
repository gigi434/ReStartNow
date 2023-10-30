import React from 'react'
import { CustomAccordion } from '@/src/components'
import { Stack, Typography, Box } from '@mui/material'
export function FAQ() {
  const faqList = [
    {
      summaryContent: 'このウェブサイトは公式的なものですか？',
      detailsContent:
        'いいえ、このウェブサイトは開発者のポートフォリオとして作成されたもので、非公式です。公式な情報源を必ずご確認ください。',
    },
    {
      summaryContent: 'このウェブサイトの利用には費用がかかりますか？',
      detailsContent:
        'いいえ、当ウェブサイトの利用は無料です。一問一答機能を通して、助成金・給付金サービスの情報を手に入れることができます。',
    },
    {
      summaryContent:
        ' 一問一答機能で提供される情報の正確性は保証されており、回答をもとに受給することが保証されていますか？',
      detailsContent:
        'いいえ、当ウェブサイトは非公式で、受給資格や受給金額計算のロジックは開発者の目視に基づいています。誤りの可能性があるため、公式情報で必ず確認をお願いします。',
    },
    {
      summaryContent:
        'ウェブサイトを利用する際に、私の個人情報は保護されますか？',
      detailsContent:
        'はい、当ウェブサイトはログインや認証を必要とせず匿名でご利用いただけます。提供された回答状況は、受給資格や受給金額の計算のみに使用され、他の目的での利用や第三者への提供は行っていません。',
    },
    {
      summaryContent:
        '助成金・給付金の情報はどれくらいの頻度で更新されますか？',
      detailsContent:
        '当ウェブサイトは開発者の個人ポートフォリオとして作成されたものです。そのため、情報の更新頻度は定期的ではございませんが、可能な限り最新の情報を提供できるよう努力しています。ご了承ください。',
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
