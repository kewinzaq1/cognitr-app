const ALPHANUMERIC = /^[a-zA-Z0-9]+$/
const SPECIAL_CHARS = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/
const UPPERCASE = /[A-Z]/
const NUMBER = /[0-9]/

export const LOGIN_REGEX = {
  ALPHANUMERIC,
  SPECIAL_CHARS,
  UPPERCASE,
  NUMBER,
}
