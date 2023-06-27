import { rest } from 'msw'

let userDataList = [
  {
    id: 'user1',
    email: 'test1@example.com',
    password: 'Password1!',
    firstName: 'John',
    lastName: 'Doe',
    age: 32,
    address: '123 ABC St, City, Country',
  },
  {
    id: 'user2',
    email: 'test2@example.com',
    password: 'Password2!',
    firstName: 'Jane',
    lastName: 'Doe',
    age: 28,
    address: '456 DEF St, City, Country',
  },
]

export const mockChangePassword = rest.get(
  '/profile/changePassword',
  async (req, res, ctx) => {
    const { currentMailAddress, currentPassword, newPassword } = req.body as any

    // ユーザーデータリストから該当するユーザーを探す
    const user = userDataList.find(
      (user) =>
        user.email === currentMailAddress && user.password === currentPassword
    )

    if (user) {
      // メールアドレスとパスワードが一致した場合、パスワードを更新
      user.password = newPassword // ここでも、実際には新しいパスワードをハッシュ化するべきです
      return res(
        ctx.status(200),
        ctx.json({
          message: 'パスワードが正常に変更されました。',
          success: true,
        })
      )
    } else {
      // メールアドレスまたはパスワードが一致しない場合、エラーメッセージを返す
      return res(
        ctx.status(403),
        ctx.json({
          success: false,
          message: '提供されたメールアドレスかパスワードが正しくありません。',
        })
      )
    }
  }
)
