

const BackGCircles = () => {
  return (
    <div className="absolute inset-0 z-[0]">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#9333ea]/20 to-[#2563eb]/20">
              </div>
              <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#9333ea', stopOpacity: 0.1 }} />
                    <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 0.1 }} />
                  </linearGradient>
                </defs>
                <circle cx="5%" cy="5%" r="10%" fill="url(#grad1)" />
                <circle cx="95%" cy="50%" r="15%" fill="url(#grad1)" />
                <circle cx="50%" cy="95%" r="20%" fill="url(#grad1)" />
                <circle cx="20%" cy="80%" r="8%" fill="url(#grad1)" />
                <circle cx="80%" cy="20%" r="12%" fill="url(#grad1)" />
              </svg>
          </div>
  )
}

export default BackGCircles
