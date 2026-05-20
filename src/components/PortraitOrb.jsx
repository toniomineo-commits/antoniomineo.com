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
