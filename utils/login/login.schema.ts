import {z} from 'zod'
import {LOGIN_REGEX} from '@/constants/login.regex'

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username requires min. 3 characters')
    .max(20, 'Username can contain max. 20 characters')
    .regex(
      LOGIN_REGEX.ALPHANUMERIC,
      'Username should contains only alphanumeric characters',
    ),
  password: z
    .string()
    .min(3, 'Password requires min. 3 characters')
    .max(20, 'Password can contain max. 20 characters')
    .regex(
      LOGIN_REGEX.SPECIAL_CHARS,
      'Password should contain at least one special character',
    )
    .regex(
      LOGIN_REGEX.UPPERCASE,
      'Password should contain at least one uppercase letter',
    )
    .regex(LOGIN_REGEX.NUMBER, 'Password should contain at least one number'),
})
