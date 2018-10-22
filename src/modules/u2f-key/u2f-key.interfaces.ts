export interface keyAuthenticateStart {
    key_handles: any,
    authRequest: any
}

export interface keyRegisterFinish {
    uuid: string,
    u2fid: string,
    key_handle: string,
    public_key: any,
    version: string,
    nickname: string
}
