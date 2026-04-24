import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface User {
    userId: number,
    userName: string,
    avatar: string
}

interface AuthState {
    token: string | null,
    user: User | null,
    isAuthenticated: boolean,

    login: (token: string, user: User) => void,
    logout: () => void,
    updateUser: (userData: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
    persist<AuthState>(
        (set) => ({
            // 初始状态
            token: null,
            user: null,
            isAuthenticated: false,

            login: (token, user) => set({
                token,
                user
            }),
            logout: () => set({
                token: null,
                user: null
            }),
            updateUser: (userData) => set((state) => ({ user: state.user ? { ...state.user, ...userData } : null })),
        }),
        { name: "auth-store" }
    )
)