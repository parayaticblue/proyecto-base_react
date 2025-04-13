export const Anchor = props => {
  const { href, className, children, ...rest } = props;

  return (
    <a
      href={href}
      className={`
        hover:opacity-70 transition-opacity opacity-100 underline
        ${className ? className : 'text-black'}
      `}
      {...rest}
    >
      {children}
    </a>
  );
};
