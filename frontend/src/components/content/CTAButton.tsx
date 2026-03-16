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
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors text-center";

  const variantClasses = {
    primary: "px-6 py-3 bg-gold text-white hover:bg-gold-hover text-base",
    secondary:
      "px-5 py-2.5 bg-white text-gold border-2 border-gold hover:bg-gold hover:text-white text-sm",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {label} <span aria-hidden="true">&rarr;</span>
    </a>
  );
}
