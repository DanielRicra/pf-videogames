/* eslint-disable  */
import { fetchUtils } from 'react-admin'

const API_URL = import.meta.env.VITE_API_URL
const httpClient = fetchUtils.fetchJson

export const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort

    const url = `${API_URL}/${resource}?sort=${field}&order=${order}&page=${page}`

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: 10,
    }))
  },

  getOne: (resource, params) =>
    httpClient(`${API_URL}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  create: (resource, params) =>
    httpClient(`${API_URL}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  update: (resource, params) =>
    httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  delete: (resource, params) =>
    httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json })),
}
