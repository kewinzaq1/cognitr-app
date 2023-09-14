import {rest} from 'msw'
import {env} from '@/utils'

export const ARTICLES_MOCK = {
  data: [
    {
      id: 1,
      attributes: {
        title: 'Artykuł 1 dla Juli',
        description: 'desc1',
        createdAt: '2023-09-03T08:17:05.657Z',
        updatedAt: '2023-09-03T08:18:57.238Z',
        publishedAt: '2023-09-03T08:18:57.234Z',
      },
    },
    {
      id: 2,
      attributes: {
        title: 'Artykuł 2 dla Juli',
        description: 'desc2',
        createdAt: '2023-09-03T08:17:16.250Z',
        updatedAt: '2023-09-03T08:19:09.377Z',
        publishedAt: '2023-09-03T08:19:09.373Z',
      },
    },
    {
      id: 3,
      attributes: {
        title: 'Artykuł 1 dla Kamila',
        description: 'desc3',
        createdAt: '2023-09-03T08:17:38.034Z',
        updatedAt: '2023-09-03T08:19:02.757Z',
        publishedAt: '2023-09-03T08:19:02.753Z',
      },
    },
    {
      id: 4,
      attributes: {
        title: 'Artykuł nr 1 dla Wojtka',
        description: 'desc4',
        createdAt: '2023-09-03T08:18:03.896Z',
        updatedAt: '2023-09-03T08:19:15.979Z',
        publishedAt: '2023-09-03T08:19:15.976Z',
      },
    },
    {
      id: 5,
      attributes: {
        title: 'Artykuł nr 2 dla wojtka',
        description: 'desc5',
        createdAt: '2023-09-03T08:18:50.140Z',
        updatedAt: '2023-09-03T08:18:50.980Z',
        publishedAt: '2023-09-03T08:18:50.974Z',
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 5,
    },
  },
}

export const articlesMock = rest.get(
  env.EXPO_PUBLIC_BASE_URL + '/api/articles',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(ARTICLES_MOCK))
  },
)
