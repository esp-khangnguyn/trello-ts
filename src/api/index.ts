import axios from 'axios'
import { apiRoot } from '@/utils/constants'

export const fetchBoardDetailsAPI = async (boardId: string) => {
  // Xử lý error try catch ở trong Interceptor của Axios , không cần code trong này

  const request = await axios.get(`${apiRoot}/boards/${boardId}`)
  return request.data
}

// update order column
export const updateBoardDetailsAPI = async (boardId: string, updateData: any) => {
  // Xử lý error try catch ở trong Interceptor của Axios , không cần code trong này

  const request = await axios.put(`${apiRoot}/boards/${boardId}`, updateData)
  return request.data
}

export const moveCardToOtherColumnAPI = async (updateData: any) => {
  // Xử lý error try catch ở trong Interceptor của Axios , không cần code trong này

  const request = await axios.put(`${apiRoot}/boards/supports/moving_cards`, updateData)
  return request.data
}

export const updateColumnDetailsAPI = async (columnId: string, updateData: any) => {
  // Xử lý error try catch ở trong Interceptor của Axios , không cần code trong này
  console.log('id ', columnId)
  const request = await axios.put(`${apiRoot}/columns/${columnId}`, updateData)
  return request.data
}

export const deleteColumnDetailsAPI = async (columnId: string) => {
  // Xử lý error try catch ở trong Interceptor của Axios , không cần code trong này
  console.log('id ', columnId)
  const request = await axios.delete(`${apiRoot}/columns/${columnId}`)
  return request.data
}

// Column
export const createNewColumnAPI = async (newColumnData: any) => {
  // Xử lý error try catch ở trong Interceptor của Axios , không cần code trong này

  const request = await axios.post(`${apiRoot}/columns/`, newColumnData)
  return request.data
}

// Card
export const createNewCardAPI = async (newCardData: any) => {
  // Xử lý error try catch ở trong Interceptor của Axios , không cần code trong này

  const request = await axios.post(`${apiRoot}/cards/`, newCardData)
  return request.data
}
