import { Subsidy } from '@prisma/client'

export let mockSubsidies: Subsidy[] = [
  {
    id: 1,
    name: 'example text',
    applicationAddress: '市町区村',
    applicationMethod: '郵送',
    amountReceived: '最大12万円',
    status: 'Continuation',
    deadlineForReceipt: new Date('2020/06/28 15:32:21'),
    description: 'example text',
    municipalityId: 1,
    relatedLink: 'https://example.com',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
  },
  {
    id: 2,
    name: 'example text2',
    applicationAddress: '市町区村',
    applicationMethod: '郵送',
    amountReceived: '最大12万円',
    status: 'Continuation',
    deadlineForReceipt: new Date('2020/06/28 15:32:21'),
    description: 'example text',
    municipalityId: 1,
    relatedLink: 'https://example.com',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
  },
]
