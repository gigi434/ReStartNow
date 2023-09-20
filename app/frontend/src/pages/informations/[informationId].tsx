import { InformationArticle } from '@/src/components'
import { fetchAllInformations, fetchInformationById } from '@/src/utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import type { Information } from '@prisma/client'

type PageProps = {
  information: Information
}

export default function Page({ information }: PageProps) {
  return <InformationArticle information={information} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const informations = await fetchAllInformations()

  const paths = informations.map((information) => ({
    params: { informationId: `${information.id}` },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const informationId = params?.informationId as string
  const information = await fetchInformationById(Number(informationId))

  return {
    props: {
      information,
    },
  }
}
