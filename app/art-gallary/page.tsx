import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import PageLayout from "@/components/PageLayout";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Art Gallery | Llamao",
  description: "Explore the Llamao NFT collection",
  openGraph: {
    images: ["/llamao_head-export.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/llamao_head-export.png"],
  },
};

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
