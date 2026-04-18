import { ReactNode } from "react";

/** Arrow-bullet item used across case studies. */
export const BulletItem = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className="bullet-row group">
    <span className="bullet-icon-wrap">
      <svg viewBox="0 0 20 20" fill="none" className="w-full h-full transition-transform group-hover:translate-x-0.5">
        <path
          d="M4 10H16M16 10L12 6M16 10L12 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
    <div>
      <h4 className="font-sans font-medium text-text-display mb-1">{title}</h4>
      <p className="text-text-body leading-relaxed text-base">{children}</p>
    </div>
  </div>
);

export const BulletList = ({
  children,
  columns = 1,
}: {
  children: ReactNode;
  columns?: 1 | 2;
}) => (
  <div
    className={`grid gap-4 mt-6 ${
      columns === 2 ? "md:grid-cols-2" : "grid-cols-1"
    }`}
  >
    {children}
  </div>
);
