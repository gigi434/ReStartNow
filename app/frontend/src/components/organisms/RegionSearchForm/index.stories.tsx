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
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        name: '市川市',
        municipalSymbolPath: '/municipality/chiba/ichikawa.png',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 2,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        name: '鎌ヶ谷市',
        municipalSymbolPath: '/municipality/chiba/kamagaya.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 3,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        name: '松戸市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 4,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        name: '千葉市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 5,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        name: '銚子市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 5,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        name: '船橋市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 6,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        name: '館山市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 7,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        name: '佐倉市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 8,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        name: '野田市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 9,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        name: '茂原市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
      {
        id: 10,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        name: '成田市',
        municipalSymbolPath: '/municipality/chiba/matsudoshi.jpg',
        prefectureId: 1,
        isSupported: true,
      },
    ],
    prefectures: [
      {
        id: 1,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        name: '千葉県',
      },
      {
        id: 2,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        name: '神奈川県',
      },
      {
        id: 3,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        name: '埼玉県',
      },
    ],
  },
}
