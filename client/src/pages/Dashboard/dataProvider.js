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
}
