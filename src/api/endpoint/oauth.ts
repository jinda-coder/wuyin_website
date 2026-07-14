import axiosInstance, { type IResponse } from "../ajax"


export interface GithubUserInfo {
    user_id: number,
    username: string,
    email: string | null,
    avatar: string,
    access_token: string,
}

/**
 * 根据github回调code码获取github用户信息
 */
export async function getGithubUserInfo(code: string): Promise<IResponse<GithubUserInfo>> {
    const response = await axiosInstance.get(`/oauth/github/userInfo?code=${code}`);
    return response.data;
}