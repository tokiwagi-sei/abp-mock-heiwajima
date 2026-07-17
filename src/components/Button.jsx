import { Link } from 'react-router-dom';

const VARIANT_CLASSES = {
  primary:
    'bg-navy-900 text-white shadow-[0_8px_20px_rgba(10,19,48,0.22)] hover:bg-navy-700 active:bg-navy-800',
  secondary:
    'bg-white text-navy-800 border border-gray-300 hover:bg-gray-50 hover:border-navy-700',
  accent:
    'bg-accent-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:bg-accent-700',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
  disabled: 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed',
};

const SIZE_CLASSES = {
  sm: 'text-[13px] px-4 py-2 gap-1.5',
  md: 'text-sm px-5 py-2.5 gap-2',
  lg: 'text-[15px] px-6 py-3 gap-2',
};

/**
 * 汎用ボタン。to を渡すと <Link>、href を渡すと <a>、それ以外は <button> になる。
 */
export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  const resolvedVariant = disabled ? 'disabled' : variant;
  const classes = [
    'inline-flex items-center justify-center rounded-card-sm font-semibold whitespace-nowrap',
    'transition-all duration-150 ease-out',
    'focus-ring',
    VARIANT_CLASSES[resolvedVariant],
    SIZE_CLASSES[size],
    !disabled && 'active:scale-[0.98]',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
