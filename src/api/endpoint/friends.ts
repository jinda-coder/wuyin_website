import type { IResponse } from "../ajax";
import axiosInstance from "../ajax";

export interface FriendItem {
    id: number,
    createTime: string,
    updateTime: string,
    author: string,
    websiteName: string,
    websiteIntroduction: string,
    websiteLink: string,
    iconUrl: string | null,
    email: string,
    status: boolean,
}

/**
 * 获取友链列表
 */
export async function list(): Promise<IResponse<FriendItem[]>> {
    const response = await axiosInstance.get("/friends/all");
    return response.data;
}
