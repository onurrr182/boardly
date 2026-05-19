// Helper to create reliable base64 SVG backgrounds that won't break HTML attributes
const createBase64Svg = (svgString) => {
  // Use btoa in browser environment, or fallback to Buffer in Node (if ever SSR'd)
  const encoded = typeof btoa === 'function' 
    ? btoa(svgString) 
    : Buffer.from(svgString).toString('base64');
  return `url('data:image/svg+xml;base64,${encoded}')`;
};

export const THEMES = {
  corkboard: {
    id: 'corkboard',
    name: 'Corkboard',
    background: '#d4b595',
    backgroundImage: createBase64Svg(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100" height="100" fill="#d4b595"/><rect width="100" height="100" filter="url(#n)" opacity="0.25"/></svg>`),
    cardStyle: 'polaroid'
  },
  graph: {
    id: 'graph',
    name: 'Graph Paper',
    background: '#f8f9fa',
    backgroundImage: createBase64Svg(`<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h40v40H0z" fill="#f8f9fa"/><path d="M0 39.5h40m-39.5-40v40" stroke="#d4d4d4" stroke-width="1" fill="none"/></svg>`),
    cardStyle: 'sticky'
  },
  confetti: {
    id: 'confetti',
    name: 'Party Confetti',
    background: '#fef3c7',
    backgroundImage: createBase64Svg(`<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#fef3c7"/><circle cx="10" cy="10" r="3" fill="#f87171"/><rect x="40" y="20" width="6" height="6" fill="#60a5fa" transform="rotate(45 43 23)"/><circle cx="30" cy="50" r="4" fill="#34d399"/><polygon points="50,40 55,50 45,50" fill="#fbbf24"/></svg>`),
    cardStyle: 'polaroid'
  },
  woodgrain: {
    id: 'woodgrain',
    name: 'Wood Desk',
    background: '#a1662f',
    backgroundImage: createBase64Svg(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="w"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.15" numOctaves="3" result="noise"/><feColorMatrix type="matrix" values="1 0 0 0 0.6 0 1 0 0 0.4 0 0 1 0 0.2 0 0 0 0.3 0" in="noise" result="coloredNoise"/></filter><rect width="200" height="200" fill="#b87a3d"/><rect width="200" height="200" filter="url(#w)"/></svg>`),
    cardStyle: 'sticky'
  },
  chevron: {
    id: 'chevron',
    name: 'Pastel Chevron',
    background: '#e0f2fe',
    backgroundImage: createBase64Svg(`<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" fill="#e0f2fe"/><path d="M0 20L20 0l20 20v20L20 20 0 40V20z" fill="#bae6fd" opacity="0.5"/></svg>`),
    cardStyle: 'polaroid'
  },
  chalkboard: {
    id: 'chalkboard',
    name: 'Chalkboard',
    background: '#2c3e50',
    backgroundImage: createBase64Svg(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="c"><feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100" height="100" fill="#2c3e50"/><rect width="100" height="100" filter="url(#c)" opacity="0.1"/></svg>`),
    cardStyle: 'sticky'
  },
  blueprint: {
    id: 'blueprint',
    name: 'Blueprint',
    background: '#1e3a8a',
    backgroundImage: createBase64Svg(`<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h40v40H0z" fill="#1e3a8a"/><path d="M0 39.5h40m-39.5-40v40" stroke="#3b82f6" stroke-width="1" fill="none" opacity="0.5"/></svg>`),
    cardStyle: 'polaroid'
  },
  polkadot: {
    id: 'polkadot',
    name: 'Polka Dot',
    background: '#fce7f3',
    backgroundImage: createBase64Svg(`<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" fill="#fce7f3"/><circle cx="20" cy="20" r="4" fill="#f472b6" opacity="0.3"/></svg>`),
    cardStyle: 'sticky'
  }
};
