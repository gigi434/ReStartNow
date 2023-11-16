import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'

/**
 * ユーザーを認証するためのカスタムロジック
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' })
  }

  /**
   * @params email string リクエストボディに格納されているEmail
   * @params password string リクエストボディに格納されているpassword
   */
  async validate(email: string, password: string) {
    console.log('Inside LocalStrategy.validate')
    const user = await this.authService.validateUser(email, password)

    if (!user) throw new UnauthorizedException()

    return user
  }
}
