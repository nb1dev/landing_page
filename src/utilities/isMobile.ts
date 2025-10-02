'use client'
const IS_MOBILE_BREAKPOINT = 768

export function isMobile(): boolean {
  console.log(window.innerWidth)
  if (window.innerWidth < IS_MOBILE_BREAKPOINT) return true
  return false
}
