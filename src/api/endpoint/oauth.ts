import axiosInstance, { type IResponse } from "../ajax"


export interface GithubUserInfo {
    id: string,
    email: string,
    nickname: string,
    avatar_url: string
}

/**
 * 根据github回调code码获取github用户信息
 */
export async function getGithubUserInfo(code: string): Promise<IResponse<GithubUserInfo>> {
    const response = await axiosInstance.get(`/oauth/github/userInfo?code=${code}`);
    return response.data;
}