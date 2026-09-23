// Micro Visual System — Core: SegmentedControl (§10.3/§12.4)
// لخيارين متبادلين مثل «نقدي / آجل». داخل حاوية واحدة، نصف قطر 12–14،
// ليس تنقلًا رئيسيًا. الاختيار يظهر بالسطح والوزن والمؤشر لا باللون وحده.

export interface SegmentOption<T extends string> {
  id: T
  label: string
}

export interface SegmentedControlProps<T extends string> {
  options: ReadonlyArray<SegmentOption<T>>
  value: T
  onChange: (value: T) => void
  ariaLabel: string
}

export function SegmentedControl<T extends string>({ options, value, onChange, ariaLabel }: SegmentedControlProps<T>) {
  return (
    <div className="segmented" role="radiogroup" aria-label={ariaLabel}>
      {options.map((opt) => {
        const selected = opt.id === value
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={selected}
            className={`segmented__option${selected ? ' is-selected' : ''}`}
            onClick={() => onChange(opt.id)}
          >
            <span className="segmented__dot" aria-hidden="true" />
            <span>{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
