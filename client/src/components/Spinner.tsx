interface SpinnerProps {
  /** Text som visas under spinnern */
  label?: string
  /** Fyll hela skärmhöjden (för helsidesladdning) */
  fullPage?: boolean
}

export default function Spinner({ label = 'Laddar…', fullPage = true }: SpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 text-center ${
        fullPage ? 'min-h-[60vh] bg-surface' : 'py-16'
      }`}
    >
      <div className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      {label && <p className="text-base font-medium text-slate-500">{label}</p>}
    </div>
  )
}
