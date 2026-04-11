import './Marquee.css'

interface Props {
  text: string
  speed?: number
  separator?: string
  variant?: 'default' | 'outline' | 'muted'
}

export default function Marquee({ text, separator = '✦', variant = 'default' }: Props) {
  const items = Array(8).fill(null)

  return (
    <div className={`marquee marquee--${variant}`}>
      <div className="marquee__track">
        {items.map((_, i) => (
          <span key={i} className="marquee__item">
            <span className="marquee__text">{text}</span>
            <span className="marquee__sep">{separator}</span>
          </span>
        ))}
        {items.map((_, i) => (
          <span key={`dup-${i}`} className="marquee__item" aria-hidden="true">
            <span className="marquee__text">{text}</span>
            <span className="marquee__sep">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
