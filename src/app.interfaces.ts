

export interface ServerResponseSuccess {
  data?: any
}



export interface ServerResponseError {
  error: string,
  detail: any
}

export interface ServerResponse {
  statusCode: number,
  payload: ServerResponseSuccess|ServerResponseError
}
