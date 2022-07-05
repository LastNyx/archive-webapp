import axios from 'axios';
import QueryParams from '../Model/QueryParams';
import SetListDto from '../Model/SetListDto';

export const axiosSetLists = (queryParams:QueryParams) => {
  return axios({
    method: 'GET',
    url: `artists/sets/all`,
    params: queryParams
  })
}

export const axiosSetList = (id:number, queryParams:QueryParams) => {
  return axios({
    method: 'GET',
    url: `artists/sets/${id}`,
    params: queryParams
  })
}

export const axiosAddSetList = (token:string, body:SetListDto) => {
  return axios({
    method: 'POST',
    url: `artists/sets`,
    data: body,
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const axiosEditSetList = (token:string, id:number, body:SetListDto) => {
  return axios({
    method: 'PUT',
    url: `artists/sets/${id}`,
    data: body,
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const axiosDeleteSetList = (token:string, id:number) => {
  return axios({
    method: 'DELETE',
    url: `artists/sets/${id}`,
    headers: { Authorization: `Bearer ${token}` }
  })
}