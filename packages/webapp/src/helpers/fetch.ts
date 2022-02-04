import {
  isClient, isStorybook, isValidUrl
} from '@app/helpers';
import { HTTPRequestMethod } from '@app/types';
import fetch from 'cross-fetch';
import {
  isEmpty, isPlainObject
} from 'lodash';

export const delay = (seconds: number): Promise<void> => new Promise(resolve => setTimeout(resolve, seconds * 1000));

interface FetchOptions<T> {
  method: HTTPRequestMethod;
  authToken?: string;
  origin?: string; // BEWARE: MUST be specified when NOT on the client. This property, when present, is also used to make the url absolute.
  referer?: string; // BEWARE: MUST be specified when NOT on the client
  body?: T;
}

export const fetchGeneric = async <T>(url: string, opt?: FetchOptions<T>): Promise<Response> => {
  try {

    let _url = opt?.origin?.length
      ? `${opt.origin}${url.startsWith('/') ? '' : '/'}${url}`
      : url;
    if (isStorybook() && !_url.startsWith('http')) {
      _url = `http://localhost:3000${url.startsWith('/') ? '' : '/'}${_url}`;
    }
    if (!_url.length || (_url.startsWith('http') && !isValidUrl(_url))) {
      return Promise.reject('---- ERROR: fetch -> invalid url');
    }

    let _opt: RequestInit | undefined = undefined;
    if (opt) {
      if (!(isPlainObject(opt) && !isEmpty(opt))) {
        return Promise.reject('---- ERROR: fetch -> invalid options');
      }
      _opt = {
        method: opt.method,
        mode: 'same-origin',
        // cache: 'no-store',
        headers: { 'Content-Type': 'application/json' }
      };
      if (opt.authToken) {
        _opt.headers = {
          ..._opt.headers,
          'Authorization': `Bearer ${opt.authToken}`
        };
      }
      if (!isClient()) {
        if (!(!!opt.origin?.length && opt.referer?.length)) {
          return Promise.reject('---- ERROR: fetch -> missing headers');
        }
        _opt.headers = {
          ..._opt.headers,
          'Origin': opt.origin,
          'Referer': opt.referer
        };
      }
      if (opt.body) {
        _opt.body = JSON.stringify(opt.body);
      }
    }

    return await fetch(_url, _opt);

  } catch (error) {
    console.log('---- ERROR fetchGeneric', error);
    throw error;
  }
};

export const fetchJSON = async <T, K>(url: string, opt?: FetchOptions<T>): Promise<K> => {
  try {

    return (
      await (
        await fetchGeneric<T>(url, opt)
      ).json()
    );

  } catch (error) {
    console.log('---- ERROR fetchJSON', error);
    throw error;
  }
};
