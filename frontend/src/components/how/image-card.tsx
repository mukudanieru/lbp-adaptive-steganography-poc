type ImageCardProps = {
  imgSrc: string;
  label?: string;
};

export default function ImageCard({ imgSrc, label }: ImageCardProps) {
  const displayLabel = label || imgSrc.split("/").pop() || "image";

  return (
    <div className="bg-card border-border flex flex-col justify-between border px-1.5 pt-1.5 pb-1">
      <img
        className="aspect-square h-auto w-full object-cover md:h-67 md:w-67"
        src={imgSrc}
        alt={displayLabel}
      />
      <span className="truncate pt-2 text-xs font-light">{displayLabel}</span>
    </div>
  );
}
