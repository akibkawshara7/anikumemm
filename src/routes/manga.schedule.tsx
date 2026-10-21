import { createFileRoute } from "@tanstack/react-router";
import { MaintenanceView } from "@/components/MaintenanceView";

export const Route = createFileRoute("/manga/schedule")({
  head: () => ({
    meta: [{ title: "Manga Schedule · AniKume" }],
  }),
  component: MangaSchedule,
});

function MangaSchedule() {
  return <MaintenanceView />;
}
