import { memo, useMemo } from 'react'

const TEXT = "antoniomineo"
const BASE_DURATIONS = [70, 110, 55, 92, 62, 120, 80]
const ROW_TOPS = ["1%", "15%", "29%", "43%", "57%", "71%", "85%"]
const COPIES = 8

const BackgroundStrips = memo(function BackgroundStrips({ variant, durations }) {
  return (
    <div className={`bg-strips ${variant}`}>
      {ROW_TOPS.map((top, i) => (
        <div key={i} className="bg-row" style={{ top }}>
          <div className="bg-track" style={{ animationDuration: `${durations[i]}s` }}>
            {[0, 1].map((half) => (
              <span key={half} className="bg-half">
                {Array.from({ length: COPIES }).map((_, ci) => (
                  <span key={ci} className="bg-unit">{TEXT}{" "}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
})

export default function BackgroundLayer({ intensity = 1 }) {
  const durations = useMemo(() => {
    const safe = Math.max(0.05, intensity)
    return BASE_DURATIONS.map((d) => d / safe)
  }, [intensity])

  return (
    <div className="bg-layer" aria-hidden="true">
      <BackgroundStrips variant="base" durations={durations} />
      <BackgroundStrips variant="overlay" durations={durations} />
    </div>
  )
}
