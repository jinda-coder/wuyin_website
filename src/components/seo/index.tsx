import { useEffect } from "react"

const SITE_NAME = "雾隐的个人博客"
const SITE_DESCRIPTION = "雾隐的个人博客，记录技术学习、实践总结、踩坑复盘与个人思考。"
const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://wuyin.dev").replace(/\/$/, "")

interface SEOProps {
    title: string
    description?: string
    robots?: string
    canonicalPath?: string
    ogType?: "website" | "article"
}

function upsertMeta(selector: string, attrs: Record<string, string>) {
    let element = document.head.querySelector(selector) as HTMLMetaElement | null

    if (!element) {
        element = document.createElement("meta")
        document.head.appendChild(element)
    }

    Object.entries(attrs).forEach(([key, value]) => {
        element?.setAttribute(key, value)
    })
}

function upsertLink(selector: string, attrs: Record<string, string>) {
    let element = document.head.querySelector(selector) as HTMLLinkElement | null

    if (!element) {
        element = document.createElement("link")
        document.head.appendChild(element)
    }

    Object.entries(attrs).forEach(([key, value]) => {
        element?.setAttribute(key, value)
    })
}

export const SEO: React.FC<SEOProps> = ({
    title,
    description = SITE_DESCRIPTION,
    robots = "index,follow",
    canonicalPath,
    ogType = "website"
}) => {
    useEffect(() => {
        const normalizedTitle = title.includes(SITE_NAME) ? title : `${title} - ${SITE_NAME}`
        const canonicalUrl = canonicalPath
            ? `${SITE_URL}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`
            : SITE_URL

        document.title = normalizedTitle

        upsertMeta('meta[name="description"]', {
            name: "description",
            content: description
        })
        upsertMeta('meta[name="robots"]', {
            name: "robots",
            content: robots
        })
        upsertMeta('meta[property="og:title"]', {
            property: "og:title",
            content: normalizedTitle
        })
        upsertMeta('meta[property="og:description"]', {
            property: "og:description",
            content: description
        })
        upsertMeta('meta[property="og:type"]', {
            property: "og:type",
            content: ogType
        })
        upsertMeta('meta[property="og:url"]', {
            property: "og:url",
            content: canonicalUrl
        })
        upsertLink('link[rel="canonical"]', {
            rel: "canonical",
            href: canonicalUrl
        })
    }, [canonicalPath, description, ogType, robots, title])

    return null
}
