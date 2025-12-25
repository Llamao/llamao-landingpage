"use client";

import React, { useMemo } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Accordion,
  AccordionItem,
  ScrollShadow,
} from "@heroui/react";
import { X } from "lucide-react";

interface CollectionStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  traitStats: Record<string, Record<string, number>>;
  totalSupply: number;
}

export const CollectionStatsModal: React.FC<CollectionStatsModalProps> = ({
  isOpen,
  onClose,
  traitStats,
  totalSupply,
}) => {
  // Filter out internal rarity keys
  const visibleTraitTypes = useMemo(() => {
    return Object.keys(traitStats)
      .filter((type) => !["Rarity Rank", "Rarity Score"].includes(type))
      .sort();
  }, [traitStats]);

  const uniqueTraitsCount = useMemo(() => {
    return visibleTraitTypes.reduce((acc, type) => {
      return acc + Object.keys(traitStats[type]).length;
    }, 0);
  }, [visibleTraitTypes, traitStats]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      className="max-h-[85vh] h-[80vh] w-full max-w-2xl bg-[#e0d4e9]/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl"
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
            y: 20,
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
      <ModalContent>
        <ModalHeader className="flex items-center justify-between p-6 bg-white/40 border-b border-purple-200/50">
          <h2 className="text-xl font-bold text-gray-800">Collection Stats</h2>
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
        </ModalHeader>

        <ModalBody className="p-0 overflow-hidden bg-white/20">
          <ScrollShadow className="h-full w-full p-6 space-y-8">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#ccb3d9] p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-3xl font-extrabold text-gray-800">
                  {totalSupply.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-gray-600 uppercase mt-1 tracking-wider">
                  Total Supply
                </span>
              </div>
              <div className="bg-[#ccb3d9] p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-3xl font-extrabold text-gray-800">
                  {visibleTraitTypes.length}
                </span>
                <span className="text-xs font-bold text-gray-600 uppercase mt-1 tracking-wider">
                  Trait Types
                </span>
              </div>
              <div className="bg-[#ccb3d9] p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-3xl font-extrabold text-gray-800">
                  {uniqueTraitsCount}
                </span>
                <span className="text-xs font-bold text-gray-600 uppercase mt-1 tracking-wider">
                  Unique Traits
                </span>
              </div>
            </div>

            {/* Trait Distribution */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 tracking-wider pl-1">
                Trait Distribution
              </h3>
              <Accordion
                variant="splitted"
                className="px-0 gap-2"
                itemClasses={{
                  base: "group p-0 bg-white/40 shadow-none border border-purple-100/50 rounded-xl mb-2",
                  title: "text-base font-semibold text-gray-800",
                  trigger: "py-3 px-4",
                  content: "pt-0 pb-4 px-4",
                  indicator: "text-gray-500",
                }}
              >
                {visibleTraitTypes.map((traitType) => {
                  const values = traitStats[traitType];
                  const valueCount = Object.keys(values).length;

                  return (
                    <AccordionItem
                      key={traitType}
                      aria-label={traitType}
                      title={
                        <div className="flex items-center justify-between w-full pr-4">
                          <span className="capitalize">{traitType}</span>
                          <span className="text-sm font-normal text-gray-500">
                            {valueCount} values
                          </span>
                        </div>
                      }
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                        {Object.entries(values)
                          .sort((a, b) => b[1] - a[1]) // Sort by count desc
                          .map(([value, count]) => {
                            const percentage = (
                              (count / totalSupply) *
                              100
                            ).toFixed(1);
                            return (
                              <div
                                key={value}
                                className="flex items-center justify-between text-sm py-1 border-b border-purple-100/50 last:border-0"
                              >
                                <span className="text-gray-700 truncate mr-2">
                                  {value}
                                </span>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span className="text-gray-500">{count}</span>
                                  <span className="bg-[#e0c8ff] text-purple-700 text-[10px] px-1.5 py-0.5 rounded font-bold min-w-[36px] text-center">
                                    {percentage}%
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </ScrollShadow>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
