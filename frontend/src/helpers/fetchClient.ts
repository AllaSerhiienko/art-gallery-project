/* eslint-disable @typescript-eslint/no-explicit-any */
import { Artwork } from '../types/Artwork.ts';
import { BASE_URL } from './constants.ts';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(100)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: Omit<Artwork, 'id'>) =>
    request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  put: <T>(url: string, data: Omit<Artwork, 'id'>) =>
    request<T>(url, 'PUT', data),
  delete: (url: string) => request(url, 'DELETE'),
};
