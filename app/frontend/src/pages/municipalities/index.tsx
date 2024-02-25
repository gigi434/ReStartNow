import { RegionSearch } from '@/src/components'
import { fetchPrefectures, fetchMunicipalities } from '@/src/utils/queries'
import { Municipality, Prefecture } from '@prisma/client'
import { GetStaticProps } from 'next'
type PageProps = {
  prefectures: Prefecture[]
  municipalities: Municipality[]
}

export default function Page({ prefectures, municipalities }: PageProps) {
  return (
    <RegionSearch
      prefectures={prefectures ?? []}
      municipalities={municipalities ?? []}
    />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prefectures: Prefecture[] = await fetchPrefectures()

  const municipalities: Municipality[] = await fetchMunicipalities()

  return {
    props: {
      prefectures,
      municipalities,
    },
    revalidate: 60,
  }
}
