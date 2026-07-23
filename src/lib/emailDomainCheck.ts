// Common consumer email domains across this site's markets (EN/DE/FR/NL/BE/CH/UK/UAE).
// Used to catch likely typos (e.g. "gmial.com") without flagging genuine, less-common domains.
const KNOWN_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'yahoo.de',
  'yahoo.fr',
  'hotmail.com',
  'hotmail.co.uk',
  'hotmail.de',
  'hotmail.fr',
  'outlook.com',
  'outlook.de',
  'outlook.fr',
  'live.com',
  'live.de',
  'live.fr',
  'live.nl',
  'icloud.com',
  'me.com',
  'aol.com',
  'gmx.de',
  'gmx.net',
  'gmx.at',
  'web.de',
  't-online.de',
  'orange.fr',
  'wanadoo.fr',
  'free.fr',
  'laposte.net',
  'ziggo.nl',
  'home.nl',
  'protonmail.com',
  'proton.me',
]

function levenshtein(a: string, b: string): number {
  const rows = a.length + 1
  const cols = b.length + 1
  const dist: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(0))

  for (let i = 0; i < rows; i++) dist[i][0] = i
  for (let j = 0; j < cols; j++) dist[0][j] = j

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dist[i][j] = Math.min(
        dist[i - 1][j] + 1,
        dist[i][j - 1] + 1,
        dist[i - 1][j - 1] + cost,
      )
    }
  }

  return dist[rows - 1][cols - 1]
}

/**
 * Returns a known domain the user likely meant to type, or null when the
 * entered domain is either already known or not close enough to any known
 * domain to be worth flagging.
 */
export function suggestEmailDomain(email: string): string | null {
  const atIndex = email.lastIndexOf('@')
  if (atIndex === -1) return null

  const domain = email.slice(atIndex + 1).trim().toLowerCase()
  if (!domain || !domain.includes('.') || domain.length < 4) return null
  if (KNOWN_DOMAINS.includes(domain)) return null

  let closest: string | null = null
  let closestDistance = Infinity

  for (const known of KNOWN_DOMAINS) {
    const distance = levenshtein(domain, known)
    if (distance < closestDistance) {
      closestDistance = distance
      closest = known
    }
  }

  if (!closest) return null
  if (closestDistance > 2 || closestDistance >= domain.length) return null

  return closest
}
