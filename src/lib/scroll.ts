/** Smoothly scroll to an element by id, accounting for the fixed navbar. */
export function scrollToId(id: string, navOffset = 88): void {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - navOffset
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
}
