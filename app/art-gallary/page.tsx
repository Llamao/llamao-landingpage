import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import PageLayout from "@/components/PageLayout";
import { Suspense } from "react";

export default function ArtGalleryPage() {
  return (
    <PageLayout>
      <div className="w-full h-full flex flex-col items-center">
        <Suspense fallback={<div className="min-h-screen" />}>
          <GalleryGrid />
          {/* update ubild */}
        </Suspense>
      </div>
    </PageLayout>
  );
}
