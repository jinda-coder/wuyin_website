/**
 * 将时间字符串转换为相对时间格式
 * @param dateStr 时间字符串，如 "2026-03-22T14:40:02.926"
 * @returns 相对时间，如 "刚刚"、"5分钟前"、"1天前"、"一周前"
 */
export function formatRelativeTime(dateStr: string): string {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30)
    const years = Math.floor(days / 365)

    if (seconds < 60) {
        return '刚刚'
    }
    if (minutes < 60) {
        return `${minutes}分钟前`
    }
    if (hours < 24) {
        return `${hours}小时前`
    }
    if (days < 7) {
        return `${days}天前`
    }
    if (weeks < 5) {
        return `${weeks}周前`
    }
    if (months < 13) {
        return `${months}个月前`
    }
    return `${years}年前`
}

/**
 * 将时间字符串转换为简短日期格式
 * @param dateStr 时间字符串
 * @returns 简短日期，如 "03-22"
 */
export function formatShortDate(dateStr: string): string {
    const date = new Date(dateStr)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${month}-${day}`
}

/**
 * 将时间字符串转换为完整日期格式
 * @param dateStr 时间字符串
 * @returns 完整日期，如 "2026-03-22"
 */
export function formatFullDate(dateStr: string): string {
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}