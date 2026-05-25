export default function WaveDivider({ color = "#ffffff", flip = false }: { color?: string; flip?: boolean }) {
  return (
    <div className="wave-divider" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="56">
        <path d="M0,28 C180,56 360,0 540,28 C720,56 900,0 1080,28 C1260,56 1350,14 1440,28 L1440,56 L0,56 Z" fill={color} />
      </svg>
    </div>
  );
}
