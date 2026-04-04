import type { IResponse } from "../ajax";
import axiosInstance from "../ajax";

export interface ArticleItem {
    articleId: string,
    title: string,
    summary: string,
    publishedTime: string,
    category: string,
    tags: string[],
}

export interface PagePeram {
    pageNo: number,
    pageSize: number,

}
export interface PageResult<T> {
    total: number,
    pageNo: number,
    pageSize: number,
    list: T[],
}


/**
 * 首页推荐文章列表
 */
export async function recommand(): Promise<IResponse<[item: ArticleItem]>> {
    const response = await axiosInstance.get("/articles/recommand");
    return response.data;
}

/**
 * 首页最近更新文章
 */
export async function recent(): Promise<IResponse<[item: ArticleItem]>> {
    const response = await axiosInstance.get("/articles/recent");
    return response.data;
}

/**
 * 文章列表分页
 */
export async function page(params: PagePeram): Promise<IResponse<PageResult<ArticleItem>>> {
    const response = await axiosInstance.post("/articles/page", params);
    return response.data;
}