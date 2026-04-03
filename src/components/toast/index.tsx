import { useEffect, useState } from "react"
import "./index.scss"

interface MessageItem {
    id: number
    content: string
    type: 'error' | 'success' | 'warning' | 'info'
}

// 消息队列（模块级状态）
let messageQueue: MessageItem[] = []
let listeners: Array<(queue: MessageItem[]) => void> = []
let idCounter = 0

// 通知所有监听者
const notifyListeners = () => {
    listeners.forEach(fn => fn([...messageQueue]))
}

// 添加消息
export const showMessage = (content: string, type: MessageItem['type'] = 'error') => {
    const id = ++idCounter
    messageQueue.push({ id, content, type })
    notifyListeners()

    // 3秒后自动移除
    setTimeout(() => {
        messageQueue = messageQueue.filter(m => m.id !== id)
        notifyListeners()
    }, 3000)
}

export const Toast: React.FC = () => {
    const [messages, setMessages] = useState<MessageItem[]>([])

    useEffect(() => {
        // 注册监听
        listeners.push(setMessages)
        return () => {
            listeners = listeners.filter(fn => fn !== setMessages)
        }
    }, [])

    if (messages.length === 0) return null

    return (
        <div className="toast-container">
            {messages.map(msg => (
                <div key={msg.id} className={`toast-item toast-${msg.type}`}>
                    <span className="toast-icon">
                        {msg.type === 'error' && '✕'}
                        {msg.type === 'success' && '✓'}
                        {msg.type === 'warning' && '⚠'}
                        {msg.type === 'info' && 'ℹ'}
                    </span>
                    <span className="toast-content">{msg.content}</span>
                </div>
            ))}
        </div>
    )
}