import axiosInstance, { type IResponse } from "../ajax"
import type { PageResult } from "./articles"

export interface UploadArticleResp {
    articleId: string
    title: string
    isNew: boolean
}

export interface AdminArticleItem {
    articleId: string
    title: string
    summary: string
    status: string
    category: string
    tags: string[]
    publishedTime: string
    updateTime: string
}

export interface AdminArticleQuery {
    pageNo: number
    pageSize: number
    status?: string
}

export async function uploadArticle(file: File): Promise<IResponse<UploadArticleResp>> {
    const form = new FormData()
    form.append("file", file)
    const response = await axiosInstance.post("/admin/articles/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 30000,
    })
    return response.data
}

export async function listAdminArticles(params: AdminArticleQuery): Promise<IResponse<PageResult<AdminArticleItem>>> {
    const response = await axiosInstance.get("/admin/articles", { params })
    return response.data
}
