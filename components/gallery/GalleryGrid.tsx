"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";

import { Input, Button, Select, SelectItem, Tooltip } from "@heroui/react";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  LayoutList,
  Shuffle,
  BarChart3,
  Heart,
} from "lucide-react";
import { NFTCard } from "./NFTCard";
import localData from "@/data/nft-metadata.json";
import { NFTDetailModal } from "./NFTDetailModal";
import { TraitFilterSidebar } from "./TraitFilterSidebar"; // Import new component
import { CollectionStatsModal } from "./CollectionStatsModal"; // Import stats component

interface Asset {
  tokenId: string;
  name: string;
  image: string;
  description: string;
  attributes: {
    traitType: string;
    value: string;
  }[];
}

interface MetaDataResponse {
  generatedAt: string;
  totalNfts: number;
  metadata: Record<string, Asset>;
  rarityRanks: Record<string, number>;
  rarityScores: Record<string, number>;
  traitStats: Record<string, Record<string, number>>;
}

const data = localData as unknown as MetaDataResponse;
const allAssetsArray = Object.values(data.metadata).sort(
  (a, b) => parseInt(a.tokenId) - parseInt(b.tokenId)
);

const ITEMS_PER_PAGE = 48;

import { useSearchParams, usePathname } from "next/navigation";

export const GalleryGrid = () => {
  const [columns, setColumns] = React.useState(6);

  const [page, setPage] = useState(1);
  const [isMounted, setIsMounted] = React.useState(false);

  const [selectedNFT, setSelectedNFT] = useState<Asset | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<string>("name");
  const [sortKey, setSortKey] = useState("id_asc");

  // New Filter State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false); // Stats Modal
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({}); // TraitType -> Array of Values

  // Extract available trait types
  const traitTypes = useMemo(() => Object.keys(data.traitStats).sort(), []);

  // Favorites State
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavorites, setShowFavorites] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  React.useEffect(() => {
    setIsMounted(true);
    // Load favorites from local storage
    const savedFavorites = localStorage.getItem("llamao_favorites");
    if (savedFavorites) {
      try {
        setFavorites(new Set(JSON.parse(savedFavorites)));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }

    // Handle Deep Linking
    const idParam = searchParams.get("id");
    if (idParam) {
      const asset = allAssetsArray.find((a) => a.tokenId === idParam);
      if (asset) {
        setSelectedNFT(asset);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);

  const toggleFavorite = (tokenId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(tokenId)) {
        newFavorites.delete(tokenId);
      } else {
        newFavorites.add(tokenId);
      }
      localStorage.setItem(
        "llamao_favorites",
        JSON.stringify(Array.from(newFavorites))
      );
      return newFavorites;
    });
  };

  // Filter and Sort Logic (Derived State)
  const filteredItems = useMemo(() => {
    let result = [...allAssetsArray];

    // 0. Favorites Filter
    if (showFavorites) {
      result = result.filter((item) => favorites.has(item.tokenId));
    }

    // 1. Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      if (searchType === "name") {
        result = result.filter(
          (item) =>
            item.name.toLowerCase().includes(lowerQuery) ||
            item.tokenId.includes(lowerQuery)
        );
      } else {
        // Search by Specific Attribute
        result = result.filter((item) =>
          item.attributes.some(
            (attr) =>
              attr.traitType === searchType &&
              attr.value.toLowerCase().includes(lowerQuery)
          )
        );
      }
    }

    // 2. Trait Filters
    const activeTraitTypes = Object.keys(selectedFilters).filter(
      (key) => selectedFilters[key].length > 0
    );

    if (activeTraitTypes.length > 0) {
      result = result.filter((item) => {
        return activeTraitTypes.every((traitType) => {
          const attr = item.attributes.find((a) => a.traitType === traitType);
          if (!attr) return false;
          return selectedFilters[traitType].includes(attr.value);
        });
      });
    }

    // 2. Sort
    switch (sortKey) {
      case "id_asc":
        result.sort((a, b) => parseInt(a.tokenId) - parseInt(b.tokenId));
        break;
      case "id_desc":
        result.sort((a, b) => parseInt(b.tokenId) - parseInt(a.tokenId));
        break;
      case "rarest":
        result.sort((a, b) => {
          const rankA = data.rarityRanks[a.tokenId] ?? Number.MAX_SAFE_INTEGER;
          const rankB = data.rarityRanks[b.tokenId] ?? Number.MAX_SAFE_INTEGER;
          return rankA - rankB;
        });
        break;
      case "common":
        result.sort((a, b) => {
          const rankA = data.rarityRanks[a.tokenId] ?? -1;
          const rankB = data.rarityRanks[b.tokenId] ?? -1;
          return rankB - rankA;
        });
        break;
    }

    return result;
  }, [
    searchQuery,
    searchType,
    sortKey,
    selectedFilters,
    showFavorites,
    favorites,
  ]);

  // Calculate visible items based on page
  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredItems, page]);

  // Load More Function
  const loadMore = useCallback(() => {
    if (visibleItems.length >= filteredItems.length) return;
    setPage((prev) => prev + 1);
  }, [visibleItems.length, filteredItems.length]);

  // Infinite Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1000 // Buffer of 1000px
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  // Handle Card Click
  const handleCardClick = (item: Asset) => {
    setSelectedNFT(item);
    setIsModalOpen(true);
    // Update URL without navigation
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", item.tokenId);
    window.history.pushState(null, "", "?" + params.toString());
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Remove ID from URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete("id");
    window.history.pushState(
      null,
      "",
      pathname + (params.toString() ? "?" + params.toString() : "")
    );
  };

  const handleResize = () => {
    if (window.innerWidth < 640) {
      setColumns(2);
    } else if (window.innerWidth < 768) {
      setColumns(3);
    } else if (window.innerWidth < 1024) {
      setColumns(4);
    } else if (window.innerWidth < 1280) {
      setColumns(5);
    } else {
      setColumns(6);
    }
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getGridClass = () => {
    switch (columns) {
      case 4:
        return "grid-cols-2 md:grid-cols-4";
      case 6:
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6";
      case 8:
        return "grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8";
      default:
        return "grid-cols-2 md:grid-cols-6";
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 py-8 px-4 max-w-7xl mx-auto">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between z-40 p-1 pointer-events-none">
        <div className="w-full md:w-80 pointer-events-auto flex items-center gap-2">
          <Input
            className="flex-grow"
            placeholder={`Search by ${searchType}...`}
            startContent={<Search size={18} />}
            type="search"
            radius="lg"
            value={searchQuery}
            onValueChange={(val) => {
              setSearchQuery(val);
              setPage(1);
            }}
          />
          <div className="w-64">
            <Select
              items={[
                { key: "name", label: "Name / ID" },
                ...traitTypes.map((t) => ({ key: t, label: t })),
              ]}
              selectedKeys={[searchType]}
              radius="lg"
              onChange={(e) => {
                if (e.target.value) {
                  setSearchType(e.target.value);
                  setPage(1);
                }
              }}
              aria-label="Search Type"
              classNames={{
                trigger: "bg-white/80 backdrop-blur-md",
              }}
              disallowEmptySelection
              renderValue={(items) => {
                return items.map((item) => (
                  <div key={item.key} className="flex items-center gap-2">
                    {item.data?.label}
                  </div>
                ));
              }}
            >
              {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar py-2 pointer-events-auto">
          <Tooltip content="Filter Attributes">
            <Button
              startContent={<SlidersHorizontal size={18} />}
              radius="lg"
              onPress={() => setIsFilterOpen(true)}
              endContent={
                Object.values(selectedFilters).flat().length > 0 ? (
                  <div className="bg-purple-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-1">
                    {Object.values(selectedFilters).flat().length}
                  </div>
                ) : null
              }
            >
              <span className="pixelify-sans-600">Filters</span>
            </Button>
          </Tooltip>

          <Tooltip content="Show Favorites">
            <Button
              isIconOnly
              radius="lg"
              onPress={() => setShowFavorites(!showFavorites)}
              className={
                showFavorites ? "text-red-500 bg-red-100" : "text-default-500"
              }
            >
              <Heart size={20} fill={showFavorites ? "currentColor" : "none"} />
            </Button>
          </Tooltip>

          <Tooltip content="Collection Stats">
            <Button
              isIconOnly
              className="text-default-500"
              onPress={() => setIsStatsOpen(true)}
            >
              <BarChart3 size={24} />
            </Button>
          </Tooltip>

          <div className="text-sm text-white font-semibold px-2 whitespace-nowrap pixelify-sans-600">
            {filteredItems.length > 0
              ? `${filteredItems.length} / ${allAssetsArray.length}`
              : "Loading..."}
          </div>

          <div className="flex items-center gap-2 bg-black/20 p-1 rounded-lg backdrop-blur-sm">
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className={`${
                columns === 4
                  ? "bg-white text-black shadow-md scale-105"
                  : "bg-transparent text-white/50 hover:text-white"
              } h-8 w-8 transition-all duration-200`}
              radius="md"
              onPress={() => setColumns(4)}
            >
              <LayoutGrid size={18} />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className={`${
                columns === 6
                  ? "bg-white text-black shadow-md scale-105"
                  : "bg-transparent text-white/50 hover:text-white"
              } h-8 w-8 transition-all duration-200`}
              radius="md"
              onPress={() => setColumns(6)}
            >
              <LayoutList size={18} className="rotate-90" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className={`${
                columns === 8
                  ? "bg-white text-black shadow-md scale-105"
                  : "bg-transparent text-white/50 hover:text-white"
              } h-8 w-8 transition-all duration-200`}
              radius="md"
              onPress={() => setColumns(8)}
            >
              <span className="flex flex-wrap gap-0.5 w-4 h-4 justify-center">
                {[...Array(9)].map((_, i) => (
                  <span
                    key={i}
                    className="w-1 h-1 bg-current rounded-[1px]"
                  ></span>
                ))}
              </span>
            </Button>
          </div>

          <div className="w-48">
            {!isMounted ? (
              <div className="h-12 w-full bg-[#e0d4e9]/80 backdrop-blur-md rounded-lg mx-auto" />
            ) : (
              <Select
                selectedKeys={[sortKey]}
                onChange={(e) => {
                  setSortKey(e.target.value);
                  setPage(1);
                }}
                aria-label="Sort by"
              >
                <SelectItem key="id_asc">ID ↑</SelectItem>
                <SelectItem key="id_desc">ID ↓</SelectItem>
                <SelectItem key="rarest">Rarest First</SelectItem>
                <SelectItem key="common">Common First</SelectItem>
              </Select>
            )}
          </div>
        </div>
      </div>

      <div className={`grid ${getGridClass()} gap-4`}>
        {visibleItems.map((item) => (
          <NFTCard
            key={item.tokenId}
            name={item.name}
            image={item.image}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      <NFTDetailModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        nft={selectedNFT}
        traitCounts={data.traitStats}
        totalSupply={data.totalNfts}
        rarityRank={
          selectedNFT ? data.rarityRanks[selectedNFT.tokenId] : undefined
        }
        isFavorite={selectedNFT ? favorites.has(selectedNFT.tokenId) : false}
        onToggleFavorite={
          selectedNFT ? () => toggleFavorite(selectedNFT.tokenId) : () => {}
        }
        onAttributeSearch={(traitType, value) => {
          setSearchQuery(value);
          setSearchType(traitType);
          setPage(1);
          handleModalClose();
        }}
      />

      {/* Filter Sidebar */}
      <TraitFilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        traitStats={data.traitStats}
        totalSupply={data.totalNfts}
        selectedFilters={selectedFilters}
        onFilterChange={(traitType, value) => {
          setSelectedFilters((prev) => {
            const currentValues = prev[traitType] || [];
            const newValues = currentValues.includes(value)
              ? currentValues.filter((v) => v !== value) // Remove if exists
              : [...currentValues, value]; // Add if not exists

            return {
              ...prev,
              [traitType]: newValues,
            };
          });
          setPage(1); // Reset page on filter change
        }}
        onClearAll={() => {
          setSelectedFilters({});
          setPage(1);
        }}
      />

      {/* Stats Modal */}
      <CollectionStatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        traitStats={data.traitStats}
        totalSupply={data.totalNfts}
      />
    </div>
  );
};
