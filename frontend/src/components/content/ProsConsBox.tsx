interface ProsConsBoxProps {
  pros: string[];
  cons: string[];
}

export default function ProsConsBox({ pros, cons }: ProsConsBoxProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {/* Pros */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-5">
        <h4 className="text-green-800 font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          What We Love
        </h4>
        <ul className="space-y-2">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-green-900">
              <span className="text-green-500 mt-0.5 shrink-0">+</span>
              {pro}
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-5">
        <h4 className="text-red-800 font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          What Could Be Better
        </h4>
        <ul className="space-y-2">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-red-900">
              <span className="text-red-500 mt-0.5 shrink-0">-</span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
