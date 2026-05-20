const YEAR = new Date().getFullYear()
const ORBIT_TEXT = `  ANTONIO MINEO  ·  ${YEAR}  ·  PRAGUE  ·  `

export default function PortraitOrb({ size = 420, x, y, mobile = false }) {
  return (
    <div
      className={`portrait-orb ${mobile ? "mobile" : ""}`}
      style={{
        left: mobile ? undefined : x,
        top: mobile ? undefined : y,
        width: size,
        height: size,
      }}
      data-orb=""
    >
      <div className="orb-ring" aria-hidden="true">
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} overflow="visible">
          <defs>
            <path
              id="orbit-path"
              d={`M ${size / 2}, ${size / 2} m -${(size - 24) / 2}, 0 a ${(size - 24) / 2},${(size - 24) / 2} 0 1,1 ${size - 24},0 a ${(size - 24) / 2},${(size - 24) / 2} 0 1,1 -${size - 24},0`}
              fill="none"
            />
          </defs>
          <text className="orbit-text">
            <textPath href="#orbit-path" startOffset="0">
              {ORBIT_TEXT.repeat(2)}
            </textPath>
          </text>
        </svg>
      </div>

      <div className="orb-disc">
        <div className="orb-image">
          <img
            src="/images/antonio.png"
            alt="Antonio Mineo"
            width="560"
            height="560"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  )
}
