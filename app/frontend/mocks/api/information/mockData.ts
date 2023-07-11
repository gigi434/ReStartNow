import { Information } from '@prisma/client'

// 仮のお知らせ情報
export let mockInformations: Information[] = [
  {
    id: 1,
    title: 'example text',
    body: 'example text',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    importance: 'Low',
    authorId: 1,
  },
  {
    id: 2,
    title: 'example text2',
    body: 'example text2',
    createdAt: new Date('2020/04/28 13:43:56'),
    updatedAt: new Date('2020/04/28 13:43:56'),
    importance: 'Middle',
    authorId: 1,
  },
]
