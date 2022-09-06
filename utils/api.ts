import { APIData } from './types'

export const API = async <T>({
  api,
  method = 'GET',
  body,
  external
}: APIData): Promise<T> =>
  await fetch(!external ? `/api/${api}` : api, {
    method,
    body
  })
    .then(data => data.json())
    .catch(err => {
      console.error(err)
      throw err.message
    })
