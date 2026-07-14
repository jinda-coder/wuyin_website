import "./index.scss"
import { useRef, useState } from "react"
import { AdminAPI } from "@/api/endpoint"
import { showMessage } from "@/components/toast"
import type { UploadArticleResp } from "@/api/endpoint/admin"

export const UploadPanel: React.FC = () => {
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<UploadArticleResp | null>(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const selectFile = (f: File) => {
        if (!f.name.endsWith(".md")) {
            showMessage("只支持 .md 格式文件")
            return
        }
        setFile(f)
        setResult(null)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
        const f = e.dataTransfer.files[0]
        if (f) selectFile(f)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0]
        if (f) selectFile(f)
        e.target.value = ""
    }

    const handleUpload = async () => {
        if (!file || loading) return
        setLoading(true)
        try {
            const resp = await AdminAPI.uploadArticle(file)
            setResult(resp.data)
            setFile(null)
        } catch {
            // 错误已由 axios 拦截器通过 toast 提示
        } finally {
            setLoading(false)
        }
    }

    const handleCopyId = (id: string) => {
        navigator.clipboard.writeText(id)
        showMessage("已复制 article_id")
    }

    return (
        <div className="upload-panel">
            <div
                className={`drop-zone ${isDragOver ? "drag-over" : ""} ${file ? "has-file" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => !file && inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".md"
                    hidden
                    onChange={handleInputChange}
                />
                {file ? (
                    <div className="file-preview">
                        <span className="file-icon">📄</span>
                        <span className="file-name">{file.name}</span>
                        <button
                            className="remove-btn"
                            onClick={(e) => { e.stopPropagation(); setFile(null); setResult(null) }}
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <div className="drop-hint">
                        <span className="drop-icon">⬆</span>
                        <p>拖拽 .md 文件到此处，或 <span className="link-text">点击选择</span></p>
                    </div>
                )}
            </div>

            <button
                className="upload-btn"
                onClick={handleUpload}
                disabled={!file || loading}
            >
                {loading ? "上传中…" : "确认上传"}
            </button>

            {result && (
                <div className={`result-box ${result.isNew ? "result-new" : "result-update"}`}>
                    {result.isNew ? (
                        <>
                            <p className="result-title">✅ 新文章已创建：《{result.title}》</p>
                            <div className="id-row">
                                <code className="article-id">{result.articleId}</code>
                                <button className="copy-btn" onClick={() => handleCopyId(result.articleId)}>
                                    复制 ID
                                </button>
                            </div>
                            <p className="result-hint">请将此 article_id 写入文章 frontmatter，下次上传时将自动更新该文章。</p>
                        </>
                    ) : (
                        <p className="result-title">✅ 《{result.title}》已更新</p>
                    )}
                </div>
            )}
        </div>
    )
}
