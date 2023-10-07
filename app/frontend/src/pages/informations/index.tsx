import { InformationListArticleList } from '@/src/components'
import { GetStaticProps } from 'next'
import { fetchAllInformations } from '@/src/utils/queries'
import type { Information } from '@prisma/client'

type PageProps = {
  informations: Information[]
}

export default function Page({ informations }: PageProps) {
  return <InformationListArticleList informations={informations} />
}

export const getStaticProps: GetStaticProps = async () => {
  const informations = await fetchAllInformations()
  return {
    props: { informations },
  }
}
