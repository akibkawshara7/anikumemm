import { createFileRoute } from "@tanstack/react-router";
import { MaintenanceView } from "@/components/MaintenanceView";

export const Route = createFileRoute("/manga/read/$id")({
  head: () => ({
    meta: [{ title: "Read Manga - AniKume" }],
  }),
  component: MangaReaderPage,
});

function MangaReaderPage() {
  return <MaintenanceView title="Manga Reader Under Maintenance" />;
}
