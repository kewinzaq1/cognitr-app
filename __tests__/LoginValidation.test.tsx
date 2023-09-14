import {userEvent, act, cleanup, screen} from '@testing-library/react-native'
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import {Alert, env} from '@/utils'
import {useAuthStore} from '@/stores/auth.store'
import {ARTICLES_INIT_STATE, AUTH_INIT_STATE} from '@/constants'
import {useArticlesStore} from '@/stores/articles.store'
import {renderApp} from '@/utils/tests/renderApp'
import {brokenLoginMock} from '@/mocks'

describe('LoginValidation', () => {
  const alertSpy = jest.spyOn(Alert, 'alert')

  afterEach(() => {
    cleanup()
    useAuthStore.setState({...AUTH_INIT_STATE})
    useArticlesStore.setState({...ARTICLES_INIT_STATE})
    alertSpy.mockClear()
  })

  test('Render Login screen correctly', () => {
    renderApp()

    expect(screen.getByText(/Welcome in/)).toBeVisible()
    expect(screen.getByText(/Cognitr/)).toBeVisible()
    expect(screen.getByText(/Login to your account/i)).toBeVisible()

    expect(screen.getByText(/username/i)).toBeVisible()
    expect(screen.getByText(/password/i)).toBeVisible()

    expect(screen.getByPlaceholderText(/input your username/i)).toBeVisible()
    expect(screen.getByPlaceholderText(/input your password/i)).toBeVisible()
  })

  test('Password validation works correctly', async () => {
    renderApp()

    expect(screen.getByText(/Welcome in/)).toBeVisible()
    expect(screen.getByText(/Cognitr/)).toBeVisible()
    expect(screen.getByText(/Login to your account/i)).toBeVisible()

    expect(screen.getByText(/username/i)).toBeVisible()
    expect(screen.getByText(/password/i)).toBeVisible()

    const passwordInput = screen.getByPlaceholderText(/input your password/i)

    const button = screen.getByRole('button', {name: /login/i})
    expect(button).toBeVisible()

    expect(passwordInput).toBeVisible()

    await act(async () => {
      await userEvent.type(passwordInput, 'ab')
      await userEvent.press(button)
    })

    expect(
      screen.getByText('Password requires min. 3 characters'),
    ).toBeVisible()

    await act(async () => {
      await userEvent.type(passwordInput, 'aqwertyuioasdfghjklzxcsweqwwwq')
      await userEvent.press(button)
    })

    await act(async () => {
      await userEvent.clear(passwordInput)
      await userEvent.type(passwordInput, '!asdad')
      await userEvent.press(button)
    })

    await act(async () => {
      await userEvent.type(passwordInput, 'aqwertyuioasdfghjklzxcsweqwwwq')
      await userEvent.press(button)
    })
    expect(
      screen.getByText('Password can contain max. 20 characters'),
    ).toBeVisible()

    await act(async () => {
      await userEvent.clear(passwordInput)
      await userEvent.type(passwordInput, 'abcd')
      await userEvent.press(button)
    })
    expect(
      screen.getByText(
        'Password should contain at least one special character',
      ),
    ).toBeVisible()

    await act(async () => {
      await userEvent.type(passwordInput, '!')
      await userEvent.press(button)
    })
    expect(
      screen.getByText('Password should contain at least one uppercase letter'),
    ).toBeVisible()

    await act(async () => {
      await userEvent.type(passwordInput, 'X')
      await userEvent.press(button)
    })

    expect(
      screen.queryByText('Password can contain max. 20 characters'),
    ).toBeNull()
    expect(
      screen.queryByText(
        'Password should contain at least one special character',
      ),
    ).toBeNull()
    expect(
      screen.queryByText(
        'Password should contain at least one uppercase letter',
      ),
    ).toBeNull()
  })

  test('Username validation works correctly', async () => {
    renderApp()

    const usernameInput = screen.getByPlaceholderText(/input your username/i)

    const button = screen.getByRole('button', {name: /login/i})
    expect(button).toBeVisible()

    expect(usernameInput).toBeVisible()

    await act(async () => {
      await userEvent.type(usernameInput, 'ab')

      await userEvent.press(button)
    })
    expect(
      screen.getByText('Username requires min. 3 characters'),
    ).toBeVisible()

    await act(async () => {
      await userEvent.type(usernameInput, 'aqwertyuioasdfghjklzxcsweqwwwq')
      await userEvent.press(button)
    })

    await act(async () => {
      await userEvent.clear(usernameInput)
      await userEvent.type(usernameInput, '!asdad')
      await userEvent.press(button)
    })
    expect(
      screen.getByText('Username should contain only alphanumeric characters'),
    ).toBeVisible()

    await act(async () => {
      await userEvent.type(usernameInput, 'aqwertyuioasdfghjklzxcsweqwwwq')
      await userEvent.press(button)
    })
    expect(
      screen.getByText('Username can contain max. 20 characters'),
    ).toBeVisible()

    await act(async () => {
      await userEvent.clear(usernameInput)
      await userEvent.type(usernameInput, 'Karol')
      await userEvent.press(button)
    })

    expect(screen.queryByText('Username requires min. 3 characters')).toBeNull()
    expect(
      screen.queryByText('Username can contain max. 20 characters'),
    ).toBeNull()
    expect(
      screen.queryByText(
        'Username should contain only alphanumeric characters',
      ),
    ).toBeNull()
  })

  test('Display authentication error from server', async () => {
    const server = setupServer(
      rest.post(
        env.EXPO_PUBLIC_BASE_URL + '/api/auth/local',
        (req, res, ctx) => {
          return res(
            ctx.status(401),
            ctx.json({
              error: {
                status: 401,
                name: 'ApplicationError',
                message: 'Invalid credentials',
              },
            }),
          )
        },
      ),
    )
    server.listen()

    renderApp()

    const button = screen.getByRole('button', {name: /login/i})

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

    expect(alertSpy).toHaveBeenLastCalledWith(
      'Authentication error',
      'Invalid credentials',
    )

    server.close()
  })

  test('Display alert about broken login data', async () => {
    const server = setupServer(brokenLoginMock)
    server.listen()

    renderApp()

    const button = screen.getByRole('button', {name: /login/i})

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

    expect(alertSpy).toHaveBeenLastCalledWith(
      'Authentication error',
      'Received unknown data! Please try again!',
    )

    server.close()
  })
})
