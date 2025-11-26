import React from "react";

type DetailPagePatternProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  metadata?: React.ReactNode;
  sections?: React.ReactNode[];
  related?: React.ReactNode;
};

export function DetailPagePattern({
  title,
  subtitle,
  actions,
  metadata,
  sections = [],
  related,
}: DetailPagePatternProps) {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            {subtitle && <p className="text-gray-500">{subtitle}</p>}
          </div>
          {actions}
        </div>
      </div>

      {/* Metadata */}
      {metadata && (
        <div className="grid grid-cols-2 gap-6">{metadata}</div>
      )}

      {/* Content sections */}
      {sections.map((section, i) => (
        <div key={i}>{section}</div>
      ))}

      {/* Related items */}
      {related && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">
            Related
          </h2>
          {related}
        </div>
      )}
    </div>
  );
}
