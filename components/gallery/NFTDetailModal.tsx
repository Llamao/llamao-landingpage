"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Tooltip,
} from "@heroui/react";
import Image from "next/image";
import { X, Share2, Heart, Search, Check, Download } from "lucide-react";

interface Trait {
  traitType: string;
  value: string;
}

interface NFTDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Relaxing the type requirement to accept the Asset interface from GalleryGrid
  // filtering specifically for what we need or making 'id' optional if acceptable
  nft: {
    id?: string;
    tokenId: string;
    name: string;
    image: string;
    description?: string;
    attributes?: Trait[];
  } | null;
  traitCounts?: Record<string, Record<string, number>>;
  totalSupply?: number;
  rarityRank?: number;
  rarityScore?: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onAttributeSearch?: (traitType: string, value: string) => void;
}

export const NFTDetailModal = ({
  isOpen,
  onClose,
  nft,
  traitCounts,
  totalSupply = 0,
  rarityRank,
  isFavorite = false,
  onToggleFavorite,
  onAttributeSearch,
}: NFTDetailModalProps) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!nft) return null;

  const collectionId = "0x21d95addcebe87bea4e49534595f242af002d068"; // Hardcoded for now based on context

  const getTraitPercentage = (traitType: string, value: string) => {
    if (!traitCounts || !totalSupply) return 0;
    const count = traitCounts[traitType]?.[value] || 0;
    return ((count / totalSupply) * 100).toFixed(2);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/art-gallary?id=${nft.tokenId}`;
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(nft.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${nft.name.replace(/\s+/g, "_")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      className="bg-[#f3e8ff]"
      hideCloseButton
      backdrop="blur"
      classNames={{
        base: "max-w-[95vw] md:max-w-[900px] max-h-[90vh] overflow-hidden",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex items-center justify-between p-4 md:p-6 border-b border-black/5 bg-white/30 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl md:text-3xl text-gray-900 vt323-regular">
                  {nft.name}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Tooltip
                  content={
                    isFavorite ? "Remove from Favorites" : "Add to Favorites"
                  }
                >
                  <Button
                    isIconOnly
                    variant="light"
                    radius="full"
                    size="sm"
                    onPress={onToggleFavorite}
                    className={isFavorite ? "text-red-500" : ""}
                  >
                    <Heart
                      size={20}
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  </Button>
                </Tooltip>
                <Tooltip content={isCopied ? "Link Copied" : "Share Link"}>
                  <Button
                    isIconOnly
                    variant="light"
                    radius="full"
                    size="sm"
                    onPress={handleShare}
                  >
                    {isCopied ? (
                      <Check size={20} className="text-green-500" />
                    ) : (
                      <Share2 size={20} />
                    )}
                  </Button>
                </Tooltip>
                <Button
                  isIconOnly
                  variant="light"
                  radius="full"
                  size="sm"
                  onPress={onClose}
                >
                  <X size={20} />
                </Button>
              </div>
            </ModalHeader>

            <ModalBody className="p-0 flex flex-col md:flex-row gap-0 overflow-hidden">
              <div className="w-full md:w-1/2 flex items-center justify-center bg-[#e0c8ff]/30 relative overflow-hidden">
                {/* <div className="absolute inset-0 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-white rounded-full opacity-60 animate-fall"
                      style={{
                        width: `${Math.random() * 6 + 4}px`,
                        height: `${Math.random() * 6 + 4}px`,
                        left: `${Math.random() * 100}%`,
                        top: `-10px`,
                        animationDuration: `${Math.random() * 5 + 3}s`,
                        animationDelay: `${Math.random() * 5}s`,
                      }}
                    />
                  ))}
                </div> */}

                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-[unset] bg-white/40">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-700 silkscreen-bold">
                    Traits
                  </h3>
                  <div className="flex gap-2">
                    {/* Rank and Score */}
                    {rarityRank && (
                      <Chip
                        size="sm"
                        variant="flat"
                        className="bg-purple-200 text-purple-700"
                      >
                        Rank <span className="font-bold">#{rarityRank}</span> /{" "}
                        {totalSupply}
                      </Chip>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {nft.attributes?.map((trait, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-purple-100/50 hover:bg-purple-100 transition-colors border border-purple-200/50"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs uppercase text-gray-500 font-semibold mb-1 pixelify-sans-600">
                          {trait.traitType}
                        </span>
                        {/* No value here, it's on the right usually, but design shows flexible layout.
                            Let's follow typical design: Label left, Value right/chip.
                            The uploaded image shows: LABEL (left) ... % VALUE (right) + SearchIcon
                        */}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-purple-600 bg-white/80 px-2 py-1 rounded-md pixelify-sans-700">
                          {getTraitPercentage(trait.traitType, trait.value)}%
                        </span>
                        <span className="text-sm font-medium text-gray-700 pixelify-sans-500">
                          {trait.value}
                        </span>
                        <Search
                          size={16}
                          className="text-gray-400 cursor-pointer hover:text-purple-600"
                          onClick={() => {
                            if (onAttributeSearch) {
                              onAttributeSearch(trait.traitType, trait.value);
                            }
                          }}
                        />
                      </div>
                      {/* Re-aligning to match image closer:
                           Left: TYPE (Background)
                           Right: % | Value | Search
                       */}
                    </div>
                  ))}

                  {/* Fallback if no attributes */}
                  {(!nft.attributes || nft.attributes.length === 0) && (
                    <div className="text-center text-gray-500 py-8">
                      No traits available.
                    </div>
                  )}
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="p-4 md:p-6 bg-white/50 border-t border-black/5 flex justify-between gap-4">
              <Button
                className="flex-1 bg-[#e42575] text-white shadow-lg shadow-pink-200"
                size="lg"
                onPress={() =>
                  window.open(
                    `https://magiceden.io/item-details/monad/${collectionId}/${nft.tokenId}`,
                    "_blank"
                  )
                }
                startContent={
                  <Image
                    src={"/magiceden.png"}
                    width={24}
                    height={24}
                    alt="Magic Eden"
                  />
                }
              >
                Magic Eden
              </Button>
              <Button
                className="flex-1 bg-[#0086ff] text-white shadow-lg shadow-blue-200"
                size="lg"
                onPress={() =>
                  window.open(
                    `https://opensea.io/item/monad/${collectionId}/${nft.tokenId}`,
                    "_blank"
                  )
                }
                startContent={
                  <Image
                    src={"/opensea.png"}
                    width={24}
                    height={24}
                    alt="Opensea"
                  />
                }
              >
                OpenSea
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
