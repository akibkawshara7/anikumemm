import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSlider } from "@/components/HeroSlider";
import { AnimeRow } from "@/components/AnimeRow";
import { TopListSection } from "@/components/TopListSection";
import { ContinueWatchingRow } from "@/components/ContinueWatchingRow";
import {
  fetchHeroManga,
  fetchTrendingManga,
  fetchSeasonalManga,
  fetchFavoritesManga,
  fetchUpcomingManga,
} from "@/lib/anilist";

import { MaintenanceView } from "@/components/MaintenanceView";

export const Route = createFileRoute("/manga/")({
  head: () => ({
    meta: [
      { title: "AniKume – Free Manga Online" },
      {
        name: "description",
        content:
          "Read manga online for free in HD on AniKume. Discover trending, seasonal, and top-rated manga.",
      },
    ],
  }),
  component: MangaHome,
});

function MangaHome() {
  return <MaintenanceView />;
}
