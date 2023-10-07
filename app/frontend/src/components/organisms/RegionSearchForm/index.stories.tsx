import { RegionSearchForm } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof RegionSearchForm> = {
  title: 'organisms/RegionSearchForm',
  component: RegionSearchForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RegionSearchForm>

export const Default: Story = {
  args: {
    municipalities: [
      {
        id: 1,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        name: '市川市',
        municipalSymbolPath: '/municipality/chiba/ichikawa.png',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 2,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        name: '鎌ヶ谷市',
        municipalSymbolPath: '/municipality/chiba/kamagaya.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 3,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        name: '松戸市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 4,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        name: '千葉市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 5,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        name: '銚子市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 5,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        name: '船橋市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 6,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        name: '館山市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 7,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        name: '佐倉市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 8,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        name: '野田市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 9,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        name: '茂原市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 10,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        name: '成田市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
    ],
    prefectures: [
      {
        id: 1,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        name: '千葉県',
      },
      {
        id: 2,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        name: '神奈川県',
      },
      {
        id: 3,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        name: '埼玉県',
      },
    ],
  },
}
