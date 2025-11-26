import { useRef } from "react";

type Props = {
  children: React.ReactNode;
};

export function Carousel({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="flex gap-4 overflow-x-auto scroll-smooth py-2"
    >
      {children}
    </div>
  );
}
