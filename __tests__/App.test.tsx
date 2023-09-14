import {
  userEvent,
  act,
  screen,
  cleanup,
  waitFor,
} from '@testing-library/react-native'
import {setupServer} from 'msw/node'
import {Alert, env} from '@/utils'
import {useAuthStore} from '@/stores/auth.store'
import {ARTICLES_INIT_STATE, AUTH_INIT_STATE} from '@/constants'
import {useArticlesStore} from '@/stores/articles.store'
import {
  loginMock,
  articlesMock,
  ARTICLES_MOCK,
  brokenArticlesMock,
} from '@/mocks'
import {renderApp} from '@/utils/tests/renderApp'
import {rest} from 'msw'

const alertSpy = jest.spyOn(Alert, 'alert')

afterEach(() => {
  cleanup()
  useAuthStore.setState({...AUTH_INIT_STATE})
  useArticlesStore.setState({...ARTICLES_INIT_STATE})
  alertSpy.mockClear()
})

const handlers = [loginMock, articlesMock]

test('Login user correctly and display its articles', async () => {
  const server = setupServer(...handlers)
  server.listen()

  renderApp()

  const button = screen.getByRole('button', {name: /login/i})

  expect(screen.getByText(/Welcome in/)).toBeVisible()
  expect(screen.getByText(/Cognitr/)).toBeVisible()
  expect(screen.getByText(/Login to your account/i)).toBeVisible()

  expect(screen.getByText(/username/i)).toBeVisible()
  expect(screen.getByText(/password/i)).toBeVisible()

  expect(screen.getByPlaceholderText(/input your username/i)).toBeVisible()
  expect(screen.getByPlaceholderText(/input your password/i)).toBeVisible()

  await act(async () => {
    await userEvent.type(
      screen.getByPlaceholderText(/input your username/i),
      'Wojtek',
    )
    await userEvent.type(
      screen.getByPlaceholderText(/input your password/i),
      'Wojtek123#',
    )
    await userEvent.press(button)
  })

  expect(alertSpy).not.toHaveBeenCalled()

  ARTICLES_MOCK.data.forEach(article => {
    expect(screen.getByText(article.attributes.title)).toBeVisible()
    expect(screen.getByText(article.attributes.description)).toBeVisible()
  })

  server.close()
})

test('Login user correctly and display error from articles fetch', async () => {
  const server = setupServer(
    loginMock,
    rest.get(env.EXPO_PUBLIC_BASE_URL + '/api/articles', (req, res, ctx) => {
      return res(
        ctx.status(401),
        ctx.json({
          error: {
            status: 404,
            name: 'Not Found',
            message: 'Cannot find current user articles',
          },
        }),
      )
    }),
  )
  server.listen()

  renderApp()

  const button = screen.getByRole('button', {name: /login/i})

  expect(screen.getByText(/Welcome in/)).toBeVisible()
  expect(screen.getByText(/Cognitr/)).toBeVisible()
  expect(screen.getByText(/Login to your account/i)).toBeVisible()

  expect(screen.getByText(/username/i)).toBeVisible()
  expect(screen.getByText(/password/i)).toBeVisible()

  expect(screen.getByPlaceholderText(/input your username/i)).toBeVisible()
  expect(screen.getByPlaceholderText(/input your password/i)).toBeVisible()

  await act(async () => {
    await userEvent.type(
      screen.getByPlaceholderText(/input your username/i),
      'Wojtek',
    )
    await userEvent.type(
      screen.getByPlaceholderText(/input your password/i),
      'Wojtek123#',
    )
    await userEvent.press(button)
  })

  expect(alertSpy).toHaveBeenCalledWith(
    'Cannot fetch articles!',
    'Cannot find current user articles',
  )

  server.close()
})

test('Login user correctly and display error about broken articles data', async () => {
  const server = setupServer(loginMock, brokenArticlesMock)
  server.listen()

  renderApp()

  const button = screen.getByRole('button', {name: /login/i})

  expect(screen.getByText(/Welcome in/)).toBeVisible()
  expect(screen.getByText(/Cognitr/)).toBeVisible()
  expect(screen.getByText(/Login to your account/i)).toBeVisible()

  expect(screen.getByText(/username/i)).toBeVisible()
  expect(screen.getByText(/password/i)).toBeVisible()

  expect(screen.getByPlaceholderText(/input your username/i)).toBeVisible()
  expect(screen.getByPlaceholderText(/input your password/i)).toBeVisible()

  await act(async () => {
    await userEvent.type(
      screen.getByPlaceholderText(/input your username/i),
      'Wojtek',
    )
    await userEvent.type(
      screen.getByPlaceholderText(/input your password/i),
      'Wojtek123#',
    )
    await userEvent.press(button)
  })

  expect(alertSpy).toHaveBeenCalledWith(
    'Cannot fetch articles!',
    'Received unknown data! Please try again!',
  )

  server.close()
})

test('Redirect user to login page when token has expired', async () => {
  const server = setupServer(
    loginMock,
    rest.get(
      env.EXPO_PUBLIC_BASE_URL + '/api/articles',
      async (req, res, ctx) => {
        await new Promise(resolve =>
          setTimeout(() => {
            resolve(true)
          }, 500),
        )

        return res(
          ctx.status(401),
          ctx.json({
            error: {
              status: 401,
              message: 'Unauthenticated',
              name: 'Unauthenticated',
            },
          }),
        )
      },
    ),
  )
  server.listen()

  renderApp()

  const button = screen.getByRole('button', {name: /login/i})

  expect(screen.getByText(/Welcome in/)).toBeVisible()
  expect(screen.getByText(/Cognitr/)).toBeVisible()
  expect(screen.getByText(/Login to your account/i)).toBeVisible()

  expect(screen.getByText(/username/i)).toBeVisible()
  expect(screen.getByText(/password/i)).toBeVisible()

  expect(screen.getByPlaceholderText(/input your username/i)).toBeVisible()
  expect(screen.getByPlaceholderText(/input your password/i)).toBeVisible()

  await act(async () => {
    await userEvent.type(
      screen.getByPlaceholderText(/input your username/i),
      'Wojtek',
    )
    await userEvent.type(
      screen.getByPlaceholderText(/input your password/i),
      'Wojtek123#',
    )
    await userEvent.press(button)
  })

  expect(screen.getAllByText('Articles')).toBeDefined()
  expect(screen.queryByText(/Welcome in/)).toBeNull()
  expect(screen.queryByText(/Cognitr/)).toBeNull()
  expect(screen.queryByText(/Login to your account/i)).toBeNull()

  expect(screen.queryByText(/username/i)).toBeNull()
  expect(screen.queryByText(/password/i)).toBeNull()

  expect(screen.queryByPlaceholderText(/input your username/i)).toBeNull()
  expect(screen.queryByPlaceholderText(/input your password/i)).toBeNull()

  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith(
      'Cannot fetch articles!',
      'Unauthenticated',
    )
  })

  expect(screen.queryByText('Articles')).toBeNull()
  expect(screen.getByText(/Welcome in/)).toBeVisible()
  expect(screen.getByText(/Cognitr/)).toBeVisible()
  expect(screen.getByText(/Login to your account/i)).toBeVisible()

  expect(screen.getByText(/username/i)).toBeVisible()
  expect(screen.getByText(/password/i)).toBeVisible()

  expect(screen.getByPlaceholderText(/input your username/i)).toBeVisible()
  expect(screen.getByPlaceholderText(/input your password/i)).toBeVisible()

  server.close()
})
