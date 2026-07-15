import { useEffect, useRef } from 'react'
import './index.scss'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    color: string
}

// 与主题色保持一致：--accent-cyan / --accent-blue / --accent-purple
const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6']
const CONNECT_DIST = 140
const SPEED = 0.35

function createParticles(w: number, h: number): Particle[] {
    const count = w < 768 ? 45 : 90
    return Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        color: COLORS[i % COLORS.length],
    }))
}

export const ParticleCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let rafId: number
        let particles: Particle[] = []
        let w = 0
        let h = 0

        const resize = () => {
            w = canvas.width = window.innerWidth
            h = canvas.height = window.innerHeight
            particles = createParticles(w, h)
        }

        const frame = () => {
            ctx.clearRect(0, 0, w, h)

            for (let i = 0; i < particles.length; i++) {
                const a = particles[i]

                a.x += a.vx
                a.y += a.vy
                if (a.x <= 0 || a.x >= w) a.vx *= -1
                if (a.y <= 0 || a.y >= h) a.vy *= -1

                // 连线
                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j]
                    const dx = a.x - b.x
                    const dy = a.y - b.y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < CONNECT_DIST) {
                        ctx.beginPath()
                        ctx.moveTo(a.x, a.y)
                        ctx.lineTo(b.x, b.y)
                        ctx.strokeStyle = a.color
                        ctx.globalAlpha = (1 - dist / CONNECT_DIST) * 0.22
                        ctx.lineWidth = 0.7
                        ctx.stroke()
                    }
                }

                // 粒子点
                ctx.beginPath()
                ctx.arc(a.x, a.y, 1.8, 0, Math.PI * 2)
                ctx.fillStyle = a.color
                ctx.globalAlpha = 0.5
                ctx.fill()
            }

            ctx.globalAlpha = 1
            rafId = requestAnimationFrame(frame)
        }

        resize()
        frame()

        window.addEventListener('resize', resize)
        return () => {
            cancelAnimationFrame(rafId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return <canvas ref={canvasRef} className="particle-canvas" />
}
