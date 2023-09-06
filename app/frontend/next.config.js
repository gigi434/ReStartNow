/** @type {import('next').NextConfig} */
const nextConfig = {
  // 要求されたパスを別のパスに書き換えることでURLプロキシとして機能させる
  async rewrites() {
    return [
      {
        // 送信元を送信先へ変換する
        source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:path*`,
        // ex. http://localhost:3000/api/proxy~をhttp://nextjs_cotainer:3005~へ変換する
        destination: `${process.env.API_SERBER_URL}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
