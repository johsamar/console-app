type Props = {
  children: React.ReactNode;
};

export function Badge({ children }: Props) {
  return (
    <span className="px-2 py-1 rounded text-xs bg-gray-200">
      {children}
    </span>
  );
}
