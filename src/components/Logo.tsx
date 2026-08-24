import logoBg from '../assets/logo_bg.png'

export function Logo({ size = 48 }: { size?: number }) {
  return (
    <img
      src={logoBg}
      alt="Menta"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
    />
  )
}
