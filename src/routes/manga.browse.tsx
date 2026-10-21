import { createFileRoute } from "@tanstack/react-router";
import { MaintenanceView } from "@/components/MaintenanceView";

export const Route = createFileRoute("/manga/browse")({
  head: () => ({
    meta: [{ title: "Browse Manga · AniDrone" }],
  }),
  component: BrowsePage,
});

function BrowsePage() {
  return <MaintenanceView />;
}
