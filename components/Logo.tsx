export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Círculo de fundo com gradiente navy/dark */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#000033', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#00004D', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="letterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4DD0E1', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#40C4FF', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Círculo principal */}
      <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />
      
      {/* H estilizado (Health) com gradiente cyan */}
      <g fill="url(#letterGradient)">
        {/* Barra vertical esquerda */}
        <rect x="25" y="25" width="10" height="50" rx="2" />
        
        {/* Barra vertical direita */}
        <rect x="65" y="25" width="10" height="50" rx="2" />
        
        {/* Barra horizontal */}
        <rect x="25" y="45" width="50" height="10" rx="2" />
      </g>
      
      {/* Detalhe de cruz médica (opcional) */}
      <circle cx="50" cy="50" r="3" fill="#40C4FF" opacity="0.8" />
    </svg>
  );
}
