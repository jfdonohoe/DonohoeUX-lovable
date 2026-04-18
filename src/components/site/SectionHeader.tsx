import { ReactNode } from "react";

/** Section header with terracotta numbered circle. */
const SectionHeader = ({
  number,
  children,
}: {
  number: number | string;
  children: ReactNode;
}) => (
  <div className="flex items-center gap-4 mb-8">
    <span className="section-number">{number}</span>
    <h2 className="m-0">{children}</h2>
  </div>
);

export default SectionHeader;
