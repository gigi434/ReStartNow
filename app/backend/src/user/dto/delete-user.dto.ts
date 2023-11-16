import { IsNotEmpty } from 'class-validator'

export class DeleteOneUserDto {
  @IsNotEmpty()
  sessionId: string
}
