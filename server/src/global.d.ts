/* eslint no-unused-vars: 0 */

import type { ApiToken } from '.prisma/client'

export {}

declare module 'stream/web' {
  namespace ReadableStream {}
}

declare global {
  namespace Express {
    interface Request {
      discordUser?: any
      GalaxyInfo: GalaxyInfo,
      token: ApiToken
    }
  }

  type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
  type AllProps<T> = { [P in keyof T]: Required<NonNullable<T[P]>>; };
  type ValueOf<T> = T[keyof T]
}