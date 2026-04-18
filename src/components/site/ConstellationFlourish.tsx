/**
 * ConstellationFlourish — animated dotted-network SVG that rings the headshot.
 * Lifted from the original site, normalized to use design tokens via currentColor.
 */
const ConstellationFlourish = () => (
  <div className="absolute -inset-12 pointer-events-none z-10 text-accent-warm">
    <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
      {/* Connection lines */}
      {[
        "M30 40 L60 25 L100 35 L140 20",
        "M160 60 L175 100 L165 140 L180 170",
        "M40 160 L25 130 L35 90 L20 60",
        "M60 175 L100 165 L140 178",
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
          fill="none"
          style={{
            strokeDashoffset: 100,
            opacity: 0,
            animation: `drawLine 1.2s ease-out ${i * 0.2}s forwards`,
          }}
        />
      ))}

      {/* Constellation dots */}
      {[
        [30, 40, 4], [60, 25, 3], [100, 35, 5], [140, 20, 3],
        [160, 60, 4], [175, 100, 3], [165, 140, 4], [180, 170, 3],
        [140, 178, 4], [100, 165, 5], [60, 175, 3], [40, 160, 4],
        [25, 130, 3], [35, 90, 4], [20, 60, 3],
      ].map(([cx, cy, r], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="currentColor"
          style={{
            opacity: 0,
            transformOrigin: "center",
            transform: "scale(0)",
            animation: `popIn 0.3s ease-out ${0.8 + i * 0.1}s forwards`,
          }}
        />
      ))}
    </svg>
  </div>
);

export default ConstellationFlourish;
