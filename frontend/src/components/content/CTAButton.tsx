interface CTAButtonProps {
  href: string;
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function CTAButton({
  href,
  label = "Check Price on Amazon",
  variant = "primary",
  className = "",
}: CTAButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2.5 font-semibold text-center transition-all duration-500 min-h-[48px]";

  const variantClasses = {
    primary:
      "px-8 py-3.5 cta-shine text-white rounded-full text-base tracking-wide hover:shadow-[0_8px_30px_rgba(201,169,110,0.3)]",
    secondary:
      "px-6 py-3 bg-white text-gold border border-gold/30 hover:bg-gold hover:text-white rounded-full text-sm tracking-wide hover:shadow-[0_4px_20px_rgba(201,169,110,0.15)]",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {label}
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}
