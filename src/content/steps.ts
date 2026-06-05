export interface Step {
  index: string
  title: string
  body: string
  /** short mono caption shown as a technical footnote on the card */
  signal: string
}

export const STEPS: Step[] = [
  {
    index: '01',
    title: 'Write, don’t paste.',
    body: 'I’ve disabled pasting for text and heading blocks. Only quotes and code blocks allow it for citations. If you’re just writing your thoughts, you won’t even notice. If you try to dump AI slop, you’ll hit the wall immediately.',
    signal: 'paste → blocked on prose blocks',
  },
  {
    index: '02',
    title: 'Tracking rhythm, never the words.',
    body: 'As you type, the engine captures raw cadence: milliseconds between keystrokes, natural pauses, and backspaces. It logs when a key is pressed, never which one. Your actual content never leaves your local machine to be verified.',
    signal: '{ timestamp, delta_ms, is_deletion }',
  },
  {
    index: '03',
    title: 'Earn the Proof-of-Human seal.',
    body: 'Inter-keystroke variance, a velocity cap of ~120 wpm, and deletion patterns combine into a 0–100 Human Confidence Score. CClear the threshold to publish your article to the ActuallyHuman feed with a seal anyone can trust.',
    signal: 'composite_score ≥ threshold → verified',
  },
]
