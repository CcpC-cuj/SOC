import { buttonStyles } from "./buttonStyles";

const Button = ({
  children,
  className,
  variant,
  size,
  block,
  loading = false,
  loadingLabel = "Please wait",
  disabled,
  ...props
}) => (
  <button
    className={buttonStyles({
      variant,
      size,
      block,
      className,
    })}
    disabled={disabled || loading}
    aria-busy={loading || undefined}
    {...props}
  >
    {loading ? (
      <>
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/25 border-t-current" />
        <span>{loadingLabel}</span>
      </>
    ) : (
      children
    )}
  </button>
);

export default Button;
