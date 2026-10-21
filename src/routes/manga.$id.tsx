import { createFileRoute } from "@tanstack/react-router";
import { MaintenanceView } from "@/components/MaintenanceView";

export const Route = createFileRoute("/manga/$id")({
  head: () => ({
    meta: [{ title: "Manga · AniKume" }],
  }),
  component: MangaDetail,
});

function MangaDetail() {
  return <MaintenanceView />;
}
