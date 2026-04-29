import { OAuthAPI } from "@/api/endpoint";
import { showMessage } from "@/components/toast";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"

export const GithubLogin: React.FC = () => {
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code');
    console.log("收到github回调, 授权码: ", code);

    useEffect(() => {
        if (!code) showMessage("未获取到授权码")

        // 获取用户信息
        OAuthAPI.getGithubUserInfo(code || "").then(response => {
            const userInfo = response.data;
            console.log(userInfo)
        })
    }, [searchParams])

    return (<></>)
}