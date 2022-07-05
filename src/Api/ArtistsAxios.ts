import axios from "axios"
import QueryParams from '../Model/QueryParams'
import ArtistDto from "../Model/ArtistDto"

export const axiosArtists = (queryParams:QueryParams) => {
  return axios({
      method: 'GET',
      url: 'artists',
      params: queryParams
  })
}

export const axiosArtist = (id:number, queryParams:QueryParams) => {
  return axios({
      method: 'GET',
      url: `artists/${id}`,
      params: queryParams
  })
}

export const axiosAddArtist = (token:string, body:ArtistDto) => {
  return axios({
      method: 'POST',
      url: `artists`,
      data: body,
      headers: { Authorization: `Bearer ${token}` }
  })
}

export const axiosEditArtist = (token:string, id:number,body:ArtistDto) => {
  return axios({
      method: 'PUT',
      url: `artists/${id}`,
      data: body,
      headers: { Authorization: `Bearer ${token}` }
  })
}

export const axiosDeleteArtist = (token:string, id:number) => {
  return axios({
      method: 'DELETE',
      url: `artists/${id}`,
      headers: { Authorization: `Bearer ${token}` }
  })
}
