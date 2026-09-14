export default function CarouselDots({
  count,
  index,
  onSelect,
}: {
  count: number;
  index: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="mt-4 flex items-center justify-center gap-1.5 md:hidden">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Ir para item ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`h-1.5 rounded-full transition-all duration-300 ease-out hover:bg-accent-6/60 ${
            i === index ? "w-5 bg-accent-6" : "w-1.5 bg-[#0e0e22]"
          }`}
        />
      ))}
    </div>
  );
}
