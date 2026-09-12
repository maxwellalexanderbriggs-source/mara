import type { Metadata } from "next";
import NewsPage from "@/components/news-page";

export const metadata: Metadata = {
  title: "News & Updates | City of Mara",
  description: "Project milestones, neighbourhood stories and progress updates from City of Mara.",
};

export default function Page() {
  return <NewsPage />;
}
