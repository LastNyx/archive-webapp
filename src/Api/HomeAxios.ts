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

export const axiosArtist = (id:number) => {
  return axios({
      method: 'GET',
      url: `artists/${id}`,
  })
}

export const axiosAddArtist = (body:ArtistDto) => {
  return axios({
      method: 'POST',
      url: `artists`,
      data: body,
  })
}

export const axiosEditArtist = (id:number,body:ArtistDto) => {
  return axios({
      method: 'PUT',
      url: `artists/${id}`,
      data: body,
  })
}

export const axiosDeleteArtist = (id:number) => {
  return axios({
      method: 'DELETE',
      url: `artists/${id}`,
  })
}
