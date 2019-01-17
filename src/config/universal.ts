import { INonce, ISha1Digest } from './interfaces'
import { from } from 'rxjs'
import { flatMap } from 'rxjs/operators'

export const digestSha1: ISha1Digest = require('js-sha1').digest

export const REQUEST_HEADERS = { 'Content-Type': 'application/soap+xml; charset=utf-8;' }
export const FETCH_CONFIG = (body: string) => ({ method: 'POST', body, headers: REQUEST_HEADERS })

export const sharedFetchWrapper =
  (fetchResponse: Promise<any>) =>
    from(fetchResponse).pipe(flatMap<any, string>(a => a.text()))

export const nonce: INonce =
  (size = 30) =>
    Array.from([...Array(size)]).map(() => Math.random().toString(36)[3]).join('')