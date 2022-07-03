import axios from "axios"

export const axiosLogin = (body: any) => {
  return axios({
      method: 'Post',
      url: 'login',
      data: body,
  })
}

export const axiosRegister = (body: any) => {
  return axios({
      method: 'Post',
      url: 'register',
      data: body,
  })
}

export const axiosLogout = (token: string) => {
  return axios({
      method: 'Post',
      url: 'logout',
      headers: { Authorization: `Bearer ${token}` }
  })
}
