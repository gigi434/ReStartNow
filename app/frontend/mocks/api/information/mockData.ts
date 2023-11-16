import { Information } from '@prisma/client'

// 仮のお知らせ情報
export let mockInformations: Information[] = [
  {
    id: 1,
    title: 'サービスが開始されました',
    body: 'this is a test',
    importance: 'Low',
    authorId: 2,
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
  },
  {
    id: 2,
    title: '鎌ヶ谷市の離職者支援助成金の一問一答が可能になりました',
    body: 'いつも当サイトをご利用いただき、ありがとうございます。\n\nこの度、鎌ヶ谷市でも離職者支援助成金の申請が可能となりました。鎌ヶ谷市にお住まいの方々も、ぜひこの機会にご利用いただけますようお知らせいたします。\n\n詳細は当サイト内の「助成金対象地域一覧」をご確認ください。\n\n引き続き、当サイトをご利用いただきますようお願い申し上げます。',
    importance: 'Low',
    authorId: 1,
    createdAt: new Date('2020/04/28 13:43:56'),
    updatedAt: new Date('2020/04/28 13:43:56'),
  },
]
