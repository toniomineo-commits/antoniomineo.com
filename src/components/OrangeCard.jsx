import { useState, useEffect, memo } from 'react'

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Selected work" },
  { id: "projects", label: "Side projects" },
  { id: "contact", label: "Contact" },
]

const SIZES = {
  home:     { w: 540, h: 520 },
  about:    { w: 540, h: 580 },
  work:     { w: 540, h: 640 },
  projects: { w: 540, h: 580 },
  contact:  { w: 540, h: 560 },
}

function HomeContent() {
  return (
    <>
      <div className="oc-eyebrow">ANTONIO MINEO</div>
      <h1 className="oc-title" style={{ fontWeight: "500" }}>
        I build brands,<br />teams, and the<br />
        <em style={{ fontWeight: "500" }}>systems that make them work.</em>
      </h1>
      <p>Brand and marketing strategy leader. Currently leading Global Brand Steering at Škoda Auto, helping keep the brand coherent across 50+ markets.</p>
      <p style={{ marginTop: 10 }}>Previously: led Škoda's full rebrand, consulted for Cupra, and built a brand strategy function from zero.</p>
      <div className="cta-row">
        <button className="ghost-pill" data-cta="contact">Get in touch →</button>
      </div>
    </>
  )
}

function AboutContent() {
  return (
    <>
      <div className="oc-eyebrow">ABOUT ME</div>
      <h1 className="oc-title">I like making sense of messy things.</h1>
      <p>Most of my work starts in ambiguity: unclear briefs, complex organizations, too many opinions, not enough structure. I'm good at taking that mess, finding the thread, and turning it into something people can actually use.</p>
      <p style={{ marginTop: 10 }}>I care about brands, but also about the people and systems behind them: how you mix these two together makes the difference.</p>
      <p style={{ marginTop: 10 }}>Outside of work, I'm usually writing, making ceramics, working out, building small digital tools, cooking, or obsessing over some tiny detail that probably matters to me more than it should.</p>
      <div className="meta-grid" style={{ marginTop: 18 }}>
        <div><span className="k">Based</span><span className="v">Prague, CZ</span></div>
        <div><span className="k">Now</span><span className="v">Škoda Auto — Head of Global Brand Steering</span></div>
        <div><span className="k">Focus</span><span className="v">Brand strategy · Creative strategy · Positioning · Governance · Team systems</span></div>
        <div><span className="k">Languages</span><span className="v">Fluent: IT · EN · ES{"\n"}Intermediate: FR{"\n"}More than a beginner: CZ</span></div>
      </div>
    </>
  )
}

function ExpandableRow({ item, isOpen, onToggle }) {
  return (
    <div className={`oc-row expandable ${isOpen ? "open" : ""}`} onClick={onToggle}>
      <div className="oc-row-head">
        <span className="num">{item.n}</span>
        <span className="name">{item.name}</span>
        <span className="meta">{item.meta}</span>
        <span className="arrow">{isOpen ? "−" : "+"}</span>
      </div>
      <div className="oc-row-body" style={{ maxHeight: isOpen ? 240 : 0 }}>
        <div className="oc-row-body-inner">{item.detail}</div>
      </div>
    </div>
  )
}

function WorkContent() {
  const [openIdx, setOpenIdx] = useState(null)
  const items = [
    { n: "01", name: "Built brand consultancy for 50+ markets", meta: "Škoda · 2026 → now",
      detail: "Leading a global team of brand consultants acting as guardians of Škoda's marketing across 50+ markets. Restructured the EU5 coverage model and launched a 7-area improvement programme spanning marketing operations." },
    { n: "02", name: "+17% in key brand metrics · 2× brand value", meta: "Škoda rebrand · 2022 → 25",
      detail: "Spearheaded Škoda's full rebrand — new positioning and \"Let's Explore\" platform — across HQ, VW Group and 50+ markets. New strategy drove a 17% lift in key brand metrics and contributed to a 2× increase in overall brand value." },
    { n: "03", name: "Sharpened Cupra's identity & long-term moves", meta: "Cupra · 2025",
      detail: "Consulted Cupra on their updated brand identity alongside their internal team and lead agency. Led a project with Interbrand to define the long-term strategic moves to strengthen the Cupra brand." },
    { n: "04", name: "Stood up Škoda's Brand Strategy function", meta: "Škoda · 2022",
      detail: "Built the internal case for a dedicated Brand Strategy function — and became its first head. Hired and led the team that didn't exist before, set its mandate, and embedded it across the marketing org." },
    { n: "05", name: "Defined the purpose behind the rebrand", meta: "Škoda · 2020 → 21",
      detail: "Developed Škoda's brand purpose — the strategic foundation the full rebrand later built on. Managed the senior committee scoping and approving the rebrand, and delivered the yearly 360° brand campaign." },
  ]
  return (
    <>
      <div className="oc-eyebrow">Selected work</div>
      <h1 className="oc-title">Results I'm proud of.</h1>
      <div className="oc-list">
        {items.map((it, i) => (
          <ExpandableRow
            key={it.n}
            item={it}
            isOpen={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}
      </div>
    </>
  )
}

function ProjectsContent() {
  const [openIdx, setOpenIdx] = useState(null)
  const items = [
    { n: "P/01", name: "First app", meta: "Building · 2026",
      detail: "A small digital product I'm building in my spare time. More soon." },
    { n: "P/02", name: "Ceramics", meta: "Clay · ongoing",
      detail: "Handmade ceramics, mostly functional objects and small pieces with personality. Recently, also part of my wedding world." },
    { n: "P/03", name: "Writing", meta: "Fiction · ongoing",
      detail: "A long-form writing project about people, timing, memory, and the small moments that change us." },
    { n: "P/04", name: "Experiments", meta: "Tools · ideas · prototypes",
      detail: "Small bets, half-formed ideas, and prototypes that may or may not become something." },
  ]
  return (
    <>
      <div className="oc-eyebrow">SIDE PROJECTS</div>
      <h1 className="oc-title">Things I make when nobody asked me to.</h1>
      <p style={{ marginBottom: 18 }}>A home for the things I build outside of work: small apps, writing, ceramics, tools, experiments, and ideas I want to see exist in the world.</p>
      <div className="oc-list">
        {items.map((it, i) => (
          <ExpandableRow
            key={it.n}
            item={it}
            isOpen={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}
      </div>
    </>
  )
}

function ContactContent() {
  const [name, setName] = useState("")
  const [from, setFrom] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("idle")

  const submit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !from.trim() || !message.trim()) return
    setStatus("sending")
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email: from, message }),
      })
      if (!res.ok) throw new Error("send-failed")
      setStatus("sent")
      setName(""); setFrom(""); setMessage("")
    } catch {
      setStatus("error")
    }
  }

  return (
    <>
      <div className="oc-eyebrow">Contact</div>
      <h1 className="oc-title">Let's talk.</h1>
      <p style={{ marginBottom: 18 }}>Brand strategy, advisory, or just a good conversation about brands and teams. Drop a note and I'll get back to you.</p>
      <form className="contact-form" onSubmit={submit}>
        <div className="cf-row">
          <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Your email" value={from} onChange={(e) => setFrom(e.target.value)} required />
        </div>
        <textarea placeholder="What's on your mind?" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} required />
        <div className="cf-foot">
          <span className="cf-status">
            {status === "sending" && "Sending…"}
            {status === "sent" && "Sent — I'll be in touch soon."}
            {status === "error" && "Something went wrong. Try again?"}
          </span>
          <button type="submit" className="ghost-pill" disabled={status === "sending"}>
            {status === "sending" ? "…" : "Send →"}
          </button>
        </div>
      </form>
    </>
  )
}

const CONTENT_MAP = { home: HomeContent, about: AboutContent, work: WorkContent, projects: ProjectsContent, contact: ContactContent }

function SectionSwitcher({ active }) {
  const [displayed, setDisplayed] = useState(active)
  const [phase, setPhase] = useState("active")

  useEffect(() => {
    if (active !== displayed) {
      setPhase("leaving")
      const t1 = setTimeout(() => {
        setDisplayed(active)
        setPhase("entering")
        requestAnimationFrame(() => requestAnimationFrame(() => setPhase("active")))
      }, 240)
      return () => clearTimeout(t1)
    }
  }, [active, displayed])

  const Comp = CONTENT_MAP[displayed]
  return (
    <div className={`oc-section ${phase === "leaving" ? "leave" : phase === "entering" ? "enter" : "active"}`} style={{ position: "relative" }}>
      <Comp />
    </div>
  )
}

export default function OrangeCard({ active, setActive, x, y, mobile }) {
  const size = SIZES[active] || SIZES.home
  const winW = typeof window !== "undefined" ? window.innerWidth : 1200
  const winH = typeof window !== "undefined" ? window.innerHeight : 800
  const maxW = Math.min(size.w, winW - 64)
  const maxH = Math.min(size.h, winH - 96)

  useEffect(() => {
    const onClick = (e) => {
      const t = e.target.closest("[data-cta]")
      if (t) setActive(t.getAttribute("data-cta"))
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [setActive])

  if (mobile) {
    return (
      <div className="orange-card mobile">
        <div className="oc-nav">
          {SECTIONS.map((s) => (
            <button key={s.id} className={active === s.id ? "active" : ""} onClick={() => setActive(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="oc-body">
          <SectionSwitcher active={active} />
        </div>
      </div>
    )
  }

  return (
    <div className="orange-card" style={{ left: x, top: y, width: maxW, height: maxH }}>
      <div className="oc-nav">
        {SECTIONS.map((s) => (
          <button key={s.id} className={active === s.id ? "active" : ""} onClick={() => setActive(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="oc-body">
        <SectionSwitcher active={active} />
      </div>
    </div>
  )
}
