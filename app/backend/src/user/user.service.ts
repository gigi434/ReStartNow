import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  /* パスワードの変更 */
  async changeUserPassword(userId: number, dto: UpdateUserDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(dto.password, 12)

    try {
      await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          hashedPassword: hashedPassword,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2001') {
          throw new NotFoundException('User account does not exist.')
        }
      }
    }
  }

  async deleteOneUserById(userId: number): Promise<void> {
    const user = await this.prismaService.user.delete({
      where: { id: userId },
    })

    if (!user) {
      throw new NotFoundException()
    }
  }
}
