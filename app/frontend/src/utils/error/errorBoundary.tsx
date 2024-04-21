import React, { Component, ReactNode } from 'react'
import { Button, Typography, Card, CardContent, Collapse } from '@mui/material'
import * as Sentry from '@sentry/nextjs'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

/**
 * 子コンポーネントツリーのレンダリング中、ライフサイクルメソッド、およびコンストラクタ内で発生したエラーをキャッチして
 * 処理するためのクラスコンポーネント
 * 関数コンポーネントとして記述ができないことに注意すること
 */
export class ErrorBoundaryClass extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  /** 子コンポーネントでエラーが発生した場合に呼び出される静的メソッド */
  static getDerivedStateFromError(error: any, errorInfo: any) {
    // エラーが発生したときにhasErrorをtrueに更新する
    return { hasError: true, error }
  }

  /**
   * 子コンポーネントでエラーが発生した際に呼び出されるライフサイクルメソッド
   * @param error スローされたエラー
   * @param errorInfo どのコンポーネントがエラーをスローしたかについての情報を含むcomponentStackキーを持つオブジェクト
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can use your own error logging service here
    Sentry.withScope((scope) => {
      // ErrorInfoオブジェクトを文字列型からインデックス型として適切な型に変換する
      scope.setExtras({ componentStack: errorInfo.componentStack })
      Sentry.captureException(error)
    })
    this.setState({ errorInfo })
  }

  /** エラーが発生した場合、エラーメッセージを表示する。。 */
  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              エラーが発生しました
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.reload()}
            >
              再読み込みしますか？
            </Button>
            <Collapse in={this.state.errorInfo != null}>
              <CardContent>
                <details className="error-details">
                  <summary>エラー詳細</summary>
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </details>
              </CardContent>
            </Collapse>
          </CardContent>
        </Card>
      )
    }

    // エラーが発生していない場合、子コンポーネントをそのままレンダリングする
    return this.props.children
  }
}
