export default function Loading() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <div
            key={index}
            className="h-72 rounded-2xl bg-white/10 animate-pulse"
          ></div>
        );
      })}
    </div>
  );
}
