import React from 'react'
import {
  NavigationMenu,
  Copyright,
  LogoButton,
  Divider,
  SocialButton,
  LinkText,
} from '@/src/components'
import { Stack, useTheme } from '@mui/material'
import { SocialButtonProps } from '@/src/components'
/**
 * フッター
 */
export function Footer() {
  const theme = useTheme()
  const socialApplication: SocialButtonProps[] = [
    { socialApplicationName: 'twitter', href: 'https://twitter.com/ReStartNow_jp' },
  ]
  return (
    <section>
      {/* 分割線 */}
      <Divider />
      <Stack
        justifyContent={'flex-start'}
        alignItems={'center'}
        spacing={3}
        sx={{
          pt: {
            xs: theme.spacing(3),
          },
          px: {
            xs: theme.spacing(2),
          },
          pb: {
            xs: theme.spacing(3),
          },
        }}
      >
        {/* ロゴ */}
        <LogoButton />
        <Stack
          direction={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          spacing={2}
        >
          {/* SNSボタンリンク */}
          {socialApplication.map(
            ({ socialApplicationName, href }: SocialButtonProps) => (
              <SocialButton
                socialApplicationName={socialApplicationName}
                href={href}
                key={socialApplicationName}
              />
            )
          )}
        </Stack>
        {/* コピーライト */}
        <Copyright>Re:Start Now</Copyright>
      </Stack>
    </section>
  )
}
