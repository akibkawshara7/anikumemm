import { Link } from "@tanstack/react-router";
import { useAppMode } from "@/components/Header";

export function Logo({ className = "" }: { className?: string }) {
  const isManga = useAppMode();

  return (
    <Link
      to={isManga ? "/manga" : "/anime"}
      className={"group inline-flex items-center " + className}
      aria-label="AniKume home"
    >
      <img
        src="/logo.png"
        alt="AniKume"
        className="h-9 w-auto select-none sm:h-11"
        draggable={false}
      />
    </Link>
  );
}
