"use client";

import React, { useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Accordion,
  AccordionItem,
  Chip,
  Input,
  ScrollShadow,
} from "@heroui/react";
import { X, Search } from "lucide-react";

interface TraitFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  traitStats: Record<string, Record<string, number>>;
  totalSupply: number;
  selectedFilters: Record<string, string[]>;
  onFilterChange: (traitType: string, value: string) => void;
  onClearAll: () => void;
}

export const TraitFilterSidebar: React.FC<TraitFilterSidebarProps> = ({
  isOpen,
  onClose,
  traitStats,
  totalSupply,
  selectedFilters,
  onFilterChange,
  onClearAll,
}) => {
  // We want to exclude "Rarity Rank" and "Rarity Score" from filters if they exist in stats
  const filteredTraitTypes = useMemo(() => {
    return Object.keys(traitStats)
      .filter((type) => !["Rarity Rank", "Rarity Score"].includes(type))
      .sort();
  }, [traitStats]);

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      className="max-h-[80vh] h-[80vh] w-full max-w-md bg-[#e0d4e9]/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      hideCloseButton
    >
      <ModalContent className="bg-[#e0d4e9]/95 backdrop-blur-xl border-l border-white/20 shadow-2xl">
        <ModalHeader className="flex flex-col gap-4 p-6 bg-white/40 border-b border-purple-200/50">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-800">Trait Filters</h2>
              {/* Clear All Button */}
              {Object.values(selectedFilters).flat().length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs font-semibold text-purple-600 hover:text-purple-800 hover:underline transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
            <Button
              isIconOnly
              variant="light"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 hover:bg-black/5"
              radius="full"
              size="sm"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Active Chips */}
          {Object.values(selectedFilters).flat().length > 0 && (
            <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto no-scrollbar">
              {Object.entries(selectedFilters).map(([type, values]) =>
                values.map((val) => (
                  <Chip
                    key={`${type}-${val}`}
                    onClose={() => onFilterChange(type, val)}
                    variant="flat"
                    classNames={{
                      base: "bg-[#9f85aa] text-white",
                      content: "font-medium text-xs px-1",
                      closeButton: "text-white/70 hover:text-white",
                    }}
                    size="sm"
                  >
                    {val}
                  </Chip>
                ))
              )}
            </div>
          )}
        </ModalHeader>

        <ModalBody className="p-0 overflow-hidden bg-white/20">
          <ScrollShadow className="h-full w-full p-4">
            <Accordion
              selectionMode="multiple"
              variant="splitted"
              className="px-0 gap-2"
              itemClasses={{
                base: "group p-0 bg-white/40 shadow-none border border-purple-100/50 rounded-xl mb-2",
                title: "text-sm font-semibold text-gray-700 uppercase",
                trigger: "py-3 px-4",
                content: "pt-0 pb-2 px-2",
                indicator: "text-gray-500",
              }}
            >
              {filteredTraitTypes.map((traitType) => {
                // Check if any filter is active for this group to highlight it
                const isActiveGroup = selectedFilters[traitType]?.length > 0;

                return (
                  <AccordionItem
                    key={traitType}
                    aria-label={traitType}
                    title={
                      <div className="flex items-center gap-2">
                        <span>{traitType}</span>
                        {isActiveGroup && (
                          <div className="w-2 h-2 rounded-full bg-purple-500" />
                        )}
                      </div>
                    }
                  >
                    <div className="flex flex-col gap-1">
                      {Object.entries(traitStats[traitType])
                        .sort((a, b) => a[0].localeCompare(b[0])) // Alphabetical sort of values
                        .map(([value, count]) => {
                          const isSelected =
                            selectedFilters[traitType]?.includes(value);
                          const percentage = (
                            (count / totalSupply) *
                            100
                          ).toFixed(1);

                          return (
                            <button
                              key={value}
                              onClick={() => onFilterChange(traitType, value)}
                              className={`
                                flex items-center justify-between w-full p-2 rounded-lg text-left transition-all
                                ${
                                  isSelected
                                    ? "bg-[#9f85aa] text-white shadow-md"
                                    : "hover:bg-[#9f85aa]/10 text-gray-600 hover:text-gray-900"
                                }
                              `}
                            >
                              <span className="text-sm truncate mr-2 font-medium">
                                {value}
                              </span>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-xs ${
                                    isSelected
                                      ? "text-white/80"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {count}
                                </span>
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold
                                  ${
                                    isSelected
                                      ? "bg-white/20 text-white"
                                      : "bg-[#e0c8ff] text-purple-700"
                                  }`}
                                >
                                  {percentage}%
                                </span>
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </ScrollShadow>
        </ModalBody>

        <ModalFooter className="p-4 bg-white/40 border-t border-purple-200/50 backdrop-blur-md">
          <Button
            fullWidth
            className="bg-[#9f85aa] text-white font-bold shadow-lg hover:bg-[#8a7295]"
            radius="lg"
            size="lg"
            onPress={onClose}
          >
            Apply Filters
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
