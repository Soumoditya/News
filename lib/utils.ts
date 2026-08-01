export function formatCrore(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L Cr`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K Cr`;
  return `₹${value.toLocaleString('en-IN')} Cr`;
}

export function formatINR(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
  return `₹${value.toLocaleString('en-IN')}`;
}

export function getSeverityColor(severity: string): string {
  const map: Record<string, string> = {
    critical: '#E63946',
    high: '#FF6B2B',
    medium: '#FFB703',
    low: '#4CAF50',
  };
  return map[severity] || '#888';
}

export function getPartyColor(party: string): string {
  const map: Record<string, string> = {
    BJP: '#FF9933',
    INC: '#138808',
    AAP: '#0066CC',
    TMC: '#20BEF0',
    SP: '#E30611',
    BSP: '#0F00B5',
    RJD: '#22AA00',
    DMK: '#CC0000',
    JDU: '#2196F3',
    JMM: '#009688',
    SAD: '#1A237E',
    NCP: '#87CEEB',
    'NCP (SP)': '#00BCD4',
    'NCP(SP)': '#00BCD4',
    'Shiv Sena': '#FF6B00',
    'Shiv Sena (UBT)': '#FF8C00',
    CPI: '#B71C1C',
    CPM: '#D32F2F',
    YSRCP: '#1565C0',
    TDP: '#FFEB3B',
    AIADMK: '#00BFA5',
    BRS: '#FF6F00',
    NC: '#00897B',
    BJD: '#006400',
    AIMIM: '#006400',
    RLD: '#FF7043',
    LJP: '#1976D2',
    'LJP (RV)': '#1976D2',
    AzSP: '#4A148C',
    NPP: '#795548',
    SHS: '#FF6B00',
    Independent: '#9E9E9E',
  };
  return map[party] || '#888888';
}

/**
 * ECI-allotted election symbols (public domain), rendered as recognizable
 * emoji stand-ins — deliberately NOT the trademarked party logos, to keep
 * the site's visual identity distinctive without any IP risk.
 */
export function getPartySymbol(party: string): string {
  const map: Record<string, string> = {
    BJP: '🪷',              // Lotus
    INC: '✋',              // Hand
    AAP: '🧹',             // Broom
    TMC: '🌸',             // Flowers & grass
    SP: '🚲',              // Bicycle
    BSP: '🐘',             // Elephant
    RJD: '🏮',             // Hurricane lantern
    JDU: '🏹',             // Arrow
    DMK: '🌅',             // Rising sun
    AIADMK: '🍃',          // Two leaves
    SAD: '⚖️',             // Weighing scale (takri)
    NCP: '🕐',             // Clock
    'NCP (SP)': '🎺',      // Man blowing turha (trumpet)
    'NCP(SP)': '🎺',
    'Shiv Sena': '🏹',     // Bow & arrow
    SHS: '🏹',
    'Shiv Sena (UBT)': '🔥', // Flaming torch (mashaal)
    CPI: '🌾',             // Ears of corn & sickle
    CPM: '☭',              // Hammer, sickle & star
    YSRCP: '🪭',           // Ceiling fan
    TDP: '🚲',             // Bicycle
    BRS: '🚗',             // Car
    BJD: '🐚',             // Conch
    AIMIM: '🪁',           // Kite
    RLD: '🚰',             // Hand pump
    LJP: '🚁',             // Helicopter
    'LJP (RV)': '🚁',
    NPP: '📖',             // Book
    JMM: '🏹',             // Bow & arrow
    NC: '🚜',              // Plough
    AzSP: '✊',            // (Azad Samaj Party)
    Independent: '👤',
  };
  return map[party] || '🗳️';
}

export function getPartyShortName(party: string): string {
  const map: Record<string, string> = {
    'Shiv Sena (UBT)': 'SS-UBT',
    'NCP (SP)': 'NCP-SP',
    'LJP (RV)': 'LJP-RV',
    'K. Chandrashekar Rao': 'BRS',
  };
  return map[party] || party;
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
  ];
  for (const [interval, label] of intervals) {
    const count = Math.floor(seconds / interval);
    if (count > 1) return `${count} ${label}s ago`;
    if (count === 1) return `${count} ${label} ago`;
  }
  return 'just now';
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
