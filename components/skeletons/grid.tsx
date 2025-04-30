import { CardSkeleton } from "./card";

export const GridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};
