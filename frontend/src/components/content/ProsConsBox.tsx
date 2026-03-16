interface ProsConsBoxProps {
  pros: string[];
  cons: string[];
}

export default function ProsConsBox({ pros, cons }: ProsConsBoxProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
      {/* Pros */}
      <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200/60 rounded-2xl p-6 shadow-sm">
        <h4 className="text-emerald-700 font-bold text-xs uppercase tracking-[0.1em] mb-4 flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          What We Love
        </h4>
        <ul className="space-y-3">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
              <span className="text-emerald-400 mt-1 shrink-0 text-lg leading-none">+</span>
              {pro}
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="bg-gradient-to-br from-rose-50 to-white border border-rose-200/60 rounded-2xl p-6 shadow-sm">
        <h4 className="text-rose-700 font-bold text-xs uppercase tracking-[0.1em] mb-4 flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
          Could Be Better
        </h4>
        <ul className="space-y-3">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
              <span className="text-rose-400 mt-1 shrink-0 text-lg leading-none">&minus;</span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
