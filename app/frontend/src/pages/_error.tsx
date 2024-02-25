import { NextPage, NextPageContext } from 'next'
import * as Sentry from '@sentry/nextjs'
import Error from 'next/error'
import React from 'react'

interface Props {
  statusCode?: number
}

const ErrorPage: NextPage<Props> = ({ statusCode }) => {
  return statusCode ? (
    <Error statusCode={statusCode}></Error>
  ) : (
    <p>An error occurred on client</p>
  )
}

ErrorPage.getInitialProps = async (ctx: NextPageContext) => {
  await Sentry.captureUnderscoreErrorException(ctx)
  const statusCode = ctx.res
    ? ctx.res.statusCode
    : ctx.err
    ? ctx.err.statusCode
    : 404
  return { statusCode }
}

export default ErrorPage
