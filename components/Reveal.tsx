import type { ReactNode } from "react";

export function Reveal({
  children,
  delay: _delay = 0,
  className = "",
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  id?: string;
}) {
  const Component = Tag as React.ElementType;
  return (
    <Component id={id} className={className}>
      {children}
    </Component>
  );
}
