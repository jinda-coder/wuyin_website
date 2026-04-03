import axios, { AxiosError, type AxiosResponse } from "axios";
import { showMessage } from "@/components/toast";

interface IResponse<T = any> {
    code: number,
    msg: string,
    data: T
}


axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000
})

// 响应拦截器
axios.interceptors.response.use(
    (response: AxiosResponse<IResponse>) => {
        if (response.data.code !== 0) {
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