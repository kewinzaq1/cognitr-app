import {env} from '@/utils'
import {rest} from 'msw'

export const brokenArticlesMock = rest.get(
  env.EXPO_PUBLIC_BASE_URL + '/api/articles',
  (req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json({
        articles: [
          {title: 'Broken title', description: 'Broken description', id: 0},
        ],
      }),
    )
  },
)
