import type { IResponse } from "../ajax";
import axiosInstance from "../ajax";

export interface RecommandArticle {
    articleId: string,
    title: string,
    summary: string,
    publishedTime: string,
    category: string,
}


/**
 * 首页推荐文章列表
 */
export async function recommand(): Promise<IResponse<[item: RecommandArticle]>> {
    const response = await axiosInstance.get("/articles/recommand");
    return response.data;
}