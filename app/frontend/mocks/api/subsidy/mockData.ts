import { CustomSubsidy } from '@/src/utils'
import { Subsidy } from '@prisma/client'

export let mockSubsidies: CustomSubsidy[] = [
  {
    id: 1,
    deadlineForReceipt: null,
    amountReceived: '最大7万1800円',
    applicationAddress: '最寄りの自立相談支援機関',
    applicationMethod: '窓口にお電話でお問い合わせ',
    status: 'Continuation',
    relatedLink: 'https://www.city.ichikawa.lg.jp/wel07/0000376345.html',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    municipalityId: 603,
    subsidyNameId: 1,
    questionGroupId: 1,
    subsidyName: {
      id: 1,
      name: '住居確保給付金',
      hepburnName: 'HousingGrant',
      description:
        '失業やコロナ禍等を原因とする収入の減少により、住居を喪失するおそれのある方を対象に、就労支援を実施し、住宅及び就労機会の確保に向けた支援を行うとともに、賃貸住宅の家賃を支給するもの',
    },
  },
  {
    id: 2,
    deadlineForReceipt: null,
    amountReceived: '最大21万8000円',
    applicationAddress: '最寄りの自立相談支援機関',
    applicationMethod: '市営住宅課（第1庁舎3階）',
    status: 'Continuation',
    relatedLink: 'https://www.city.ichikawa.lg.jp/wel08/1111000004.html',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    municipalityId: 603,
    subsidyNameId: 2,
    questionGroupId: 2,
    subsidyName: {
      id: 2,
      name: '民間賃貸住宅家賃等助成制度',
      hepburnName: 'PrivateRentalHousing',
      description:
        '住居確保及び生活の安定を図るため、市内に居住し取り壊し等による転居を求められた高齢者、心身障がい者、ひとり親世帯等の方が市内に転居する場合、住宅家賃の差額と転居費用を助成する制度です。',
    },
  },
  {
    id: 3,
    deadlineForReceipt: null,
    amountReceived: '最大10万',
    applicationAddress: '保健センター健康支援課',
    applicationMethod: '複合',
    status: 'Continuation',
    relatedLink: 'https://www.city.ichikawa.lg.jp/pub03/0000421131.html',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    municipalityId: 603,
    subsidyNameId: 3,
    questionGroupId: 3,
    subsidyName: {
      id: 3,
      name: '出産・子育て応援給付金',
      hepburnName: 'ChildBirthGrant',
      description:
        '国において、妊娠期から出産・子育て期まで一貫して身近で相談に応じ、必要な支援につなぐ「伴走型相談支援」と、妊婦や子育て世帯への「経済的支援」を一体的に実施する事業が創設されました。本市においても、3月9日に事業を開始します。令和4年4月1日以降に妊娠届出、出産をされた方が対象になります。',
    },
  },
]
