import axios from 'axios';
import QueryParams from '../Model/QueryParams';
import SetListDto from '../Model/SetListDto';

export const axiosSetList = (id:number, queryParams:QueryParams) => {
  return axios({
    method: 'GET',
    url: `artists/sets/${id}`,
    params: queryParams
  })
}

export const axiosAddSetList = (body:SetListDto) => {
  return axios({
    method: 'POST',
    url: `artists/sets`,
    data: body,
  })
}

export const axiosEditSetList = (id:number, body:SetListDto) => {
  return axios({
    method: 'PUT',
    url: `artists/sets/${id}`,
    data: body,
  })
}

export const axiosDeleteSetList = (id:number) => {
  return axios({
    method: 'DELETE',
    url: `artists/sets/${id}`,
  })
}