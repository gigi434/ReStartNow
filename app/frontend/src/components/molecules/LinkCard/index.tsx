import { Card, CardProps } from '@/src/components'
import Link from 'next/link'
import { Link as MuiLink } from '@mui/material'

type LinkCardProps = CardProps & {
  href: string
}

export function LinkCard({ image, title, description, href }: LinkCardProps) {
  return (
    // legacyBehaviorをTrueにすることで文字列の下線が消える
    // https://nextjs.org/docs/pages/api-reference/components/link#legacybehavior
    <Link href={href} passHref legacyBehavior>
      <MuiLink underline="none">
        <Card image={image} title={title} description={description} clickable={true} />
      </MuiLink>
    </Link>
  )
}
