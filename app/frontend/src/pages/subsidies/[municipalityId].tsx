import { SubsidySearch } from '@/src/components'
import { fetchAllSubsidies, fetchSubsidies } from '@/src/hooks'
import { ClientSideSubsidy } from '@/src/types'
import { CircularProgress } from '@mui/material'
import { fi } from 'date-fns/locale'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

type PageProps = {
  subsidies: ClientSideSubsidy[]
}

export default function Page({ subsidies }: PageProps) {
  const router = useRouter()

  if (router.isFallback) {
    return <CircularProgress />
  }

  return <SubsidySearch subsidies={subsidies} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const subsidies: ClientSideSubsidy[] = await fetchAllSubsidies()
    const paths = subsidies.map((subsidy) => ({
      params: { municipalityId: `${subsidy.municipalityId}` },
    }))

    return { paths, fallback: false }
  } catch (err) {
    console.log(err)
    return { paths: [], fallback: false }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const municipalityId = params?.municipalityId as string

    const subsidies = await fetchSubsidies(Number(municipalityId))

    const notFound = subsidies[0] ? false : true
    return {
      props: {
        subsidies,
      },
      notFound,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    return {
      props: {
        subsidies: [],
      },
      notFound: true,
    }
  }
}
