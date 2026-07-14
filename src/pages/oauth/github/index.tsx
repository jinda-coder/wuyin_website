import { OAuthAPI } from "@/api/endpoint";
import { showMessage } from "@/components/toast";
import { useAuthStore } from "@/stores/authStore";

import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"

export const GithubLogin: React.FC = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)
    const code = searchParams.get('code');

    useEffect(() => {
        if (!code) {
            showMessage("未获取到授权码")
            return
        }

        OAuthAPI.getGithubUserInfo(code).then(response => {
            const userInfo = response.data;
            login(userInfo.access_token, {
                userId: userInfo.user_id,
                userName: userInfo.username,
                avatar: userInfo.avatar,
            })
            navigate("/")
        })
    }, [searchParams])

    return (<></>)
}
