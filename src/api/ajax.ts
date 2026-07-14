import axios, { AxiosError, type AxiosResponse } from "axios";
import { showMessage } from "@/components/toast";

export interface IResponse<T = any> {
    code: number,
    msg: string,
    data: T
}


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000
})

// 请求拦截器 —— 自动注入 JWT token
axiosInstance.interceptors.request.use((config) => {
    const raw = localStorage.getItem("auth-store")
    if (raw) {
        try {
            const token = JSON.parse(raw)?.state?.token as string | null
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`
            }
        } catch {
            // ignore
        }
    }
    return config
})

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse<IResponse>) => {
        if (response.data.code !== 0) {
            showMessage(response.data.msg);
            return Promise.reject(response.data.msg);
        }
        return response;
    },
    (error: AxiosError) => {
        const { response } = error;
        if (response) {
            const responseData = response.data as Partial<IResponse> | undefined;
            showMessage(responseData?.msg || `请求失败(${response.status})`);
            return Promise.reject(responseData ?? error);
        }

        showMessage("网络连接异常，请稍后再试");
        return Promise.reject(error);
    }
)

export default axiosInstance;
