import { useState, useEffect, useRef } from 'react'
import BackgroundLayer from './components/Background'
import OrangeCard from './components/OrangeCard'
import PortraitOrb from './components/PortraitOrb'

export default function App() {
  const [active, setActive] = useState("home")
  const [loaded, setLoaded] = useState(false)
  const [vp, setVp] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 1280,
    h: typeof window !== "undefined" ? window.innerHeight : 800,
  }))

  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const targetParaRef = useRef({ x: 0, y: 0 })

  const isMobile = vp.w < 760
  const CARD_SIZES = { home: 540, about: 620, work: 680, projects: 620, contact: 540 }
  const ORANGE_W = CARD_SIZES[active] || 540
  const ORANGE_LEFT = Math.max(48, Math.min(vp.w * 0.08, 140))
  const ORANGE_TOP = Math.max(48, (vp.h - 580) / 2)
  const ORB_RIGHT_MARGIN = Math.max(56, vp.w * 0.06)
  const ORB_GAP = 96
  const orangeRight = ORANGE_LEFT + ORANGE_W
  const orbAvailable = vp.w - orangeRight - ORB_GAP - ORB_RIGHT_MARGIN
  const ORB_SIZE = Math.max(240, Math.min(420, orbAvailable, vp.h * 0.62))
  const orangePos = isMobile ? { x: 0, y: 0 } : { x: ORANGE_LEFT, y: ORANGE_TOP }
  const orbPos = isMobile
    ? { x: 0, y: 0 }
    : { x: vp.w - ORB_SIZE - ORB_RIGHT_MARGIN, y: (vp.h - ORB_SIZE) / 2 }

  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 320)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    let raf = 0
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setVp({ w: window.innerWidth, h: window.innerHeight }))
    }
    window.addEventListener("resize", onResize, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize) }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const onMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.active = true
      root.style.setProperty("--mx", e.clientX + "px")
      root.style.setProperty("--my", e.clientY + "px")
      targetParaRef.current.x = (e.clientX / window.innerWidth) - 0.5
      targetParaRef.current.y = (e.clientY / window.innerHeight) - 0.5
    }
    const onLeave = () => {
      mouseRef.current.active = false
      root.style.setProperty("--mx", "-9999px")
      root.style.setProperty("--my", "-9999px")
      targetParaRef.current = { x: 0, y: 0 }
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  useEffect(() => {
    if (isMobile) return
    const root = document.documentElement
    let raf
    let px = 0, py = 0
    let mx = 0, my = 0
    const tick = () => {
      const tp = targetParaRef.current
      px += (tp.x - px) * 0.06
      py += (tp.y - py) * 0.06
      root.style.setProperty("--para-x", (px * 18).toFixed(2) + "px")
      root.style.setProperty("--para-y", (py * 12).toFixed(2) + "px")

      const orb = document.querySelector("[data-orb]")
      let tmx = 0, tmy = 0
      if (orb && mouseRef.current.active) {
        const r = orb.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = mouseRef.current.x - cx
        const dy = mouseRef.current.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const FIELD = 320
        const MAX = 26
        if (dist < FIELD) {
          const k = (1 - dist / FIELD) * MAX
          tmx = (dx / Math.max(1, dist)) * k
          tmy = (dy / Math.max(1, dist)) * k
        }
      }
      mx += (tmx - mx) * 0.12
      my += (tmy - my) * 0.12
      if (orb) {
        orb.style.setProperty("--mag-x", mx.toFixed(2) + "px")
        orb.style.setProperty("--mag-y", my.toFixed(2) + "px")
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isMobile])

  useEffect(() => {
    document.body.classList.toggle("is-mobile", isMobile)
  }, [isMobile])

  return (
    <>
      <div className={`shutter ${loaded ? "hide" : ""}`}>antoniomineo.com</div>

      <BackgroundLayer intensity={0.1} />

      <div
        className={`cards-wrap ${isMobile ? "mobile" : ""}`}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 700ms ease 120ms" }}
      >
        <PortraitOrb
          size={isMobile ? 320 : ORB_SIZE}
          x={orbPos.x}
          y={orbPos.y}
          mobile={isMobile}
        />
        <OrangeCard
          active={active}
          setActive={setActive}
          x={orangePos.x}
          y={orangePos.y}
          mobile={isMobile}
        />
      </div>

      <div className="cursor-ring" aria-hidden="true" />
    </>
  )
}
