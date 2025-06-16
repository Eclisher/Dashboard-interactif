import * as React from "react";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
}

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`p-4 ${className}`}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

export { CardContent };


export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="border-b p-4">{children}</div>;
}

type CardTitleProps = React.HTMLAttributes<HTMLDivElement>;
const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`p-4 ${className}`}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

export { CardTitle };
