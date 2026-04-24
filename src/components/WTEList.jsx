import React, { useState, useCallback } from 'react';
import VelocityPointsIcon from '../assets/icons/velocity-points.svg';
import { useSaveSlots } from '../state/useSaveSlots';
import { maskSpend } from '../utils/maskSpend';
import { maskPts } from '../utils/maskPts';

/**
 * WTEList
 * Props:
 * - WTEs: array of all WTE objects
 * - activeCategory: string
 * - selectedIds: array of selected WTE ids
 * - expandedId: id of currently expanded WTE (or null)
 * - tierIndexById: { [id]: number } mapping to current tier index (0–4)
 * - onToggleSelect: (id) => void
 * - onToggleExpand: (id) => void
 * - onTierChange: (id, newIndex) => void
 */
export default function WTEList({
  WTEs,
  items, // If provided, we use these items directly instead of filtering by activeCategory
  activeCategory,
  selectedIds,
  expandedId,
  tierIndexById,
  onToggleSelect,
  onToggleExpand,
  onTierChange,
  onToggleEarnExample,
  isEarnExampleOpen,
  onToggleFindOutMore,
  isFindOutMoreOpen,
  compact = false
}) {
  const { current } = useSaveSlots();
  const opaqueSpend = current?.opaqueSpend ?? false;
  const opaqueEarn = current?.opaqueEarn ?? false;
  const [justSelected, setJustSelected] = useState(new Set());

  const handleToggleWithFlair = useCallback((id) => {
    const isCurrentlySelected = selectedIds.includes(id);
    if (!isCurrentlySelected) {
      setJustSelected(prev => new Set(prev).add(id));
      setTimeout(() => setJustSelected(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      }), 700);
    }
    onToggleSelect(id);
  }, [selectedIds, onToggleSelect]);
  const TIER_LABELS = [
    'Low earn target',
    'Medium-low earn target',
    'Medium earn target',
    'Medium-high earn target',
    'High earn target',
  ];
  const displayItems = items || WTEs.filter(w => w.category === activeCategory);

  return (
    <div className={compact ? "space-y-0" : "space-y-0"}>
      {displayItems.map(w => {
        const tierIdx = tierIndexById[w.id] ?? 0;
        const tier = Array.isArray(w.tiers) && w.tiers[tierIdx]
          ? w.tiers[tierIdx]
          : { pts: 0, spend: 0 };
        const isSelected = selectedIds.includes(w.id);
        const isExpanded = expandedId === w.id;

        return (
          <div key={w.id} className={`border-b border-gray-100 transition-colors duration-300 ${isSelected ? 'bg-[#EEF7F8]' : 'bg-white'}`}>
            {/* ROW HEADER */}
            <div
              className={`flex items-center justify-between px-3 cursor-pointer ${compact ? 'py-2 px-2' : 'py-4'}`}
              onClick={() => onToggleExpand(w.id)}
            >
              <div className="flex items-center space-x-3">
                {/* Logo or Checkmark */}
                <div
                  className={`${compact ? 'w-7 h-7' : 'w-10 h-10'} flex-shrink-0 flex items-center justify-center overflow-visible relative`}
                  onClick={(e) => { e.stopPropagation(); handleToggleWithFlair(w.id); }}
                >
                  {isSelected ? (
                    <>
                      <div className={`${compact ? 'w-[24px] h-[24px]' : 'w-[32px] h-[32px]'} bg-[#00a600] rounded-full flex items-center justify-center shadow-sm ${justSelected.has(w.id) ? 'animate-celebrate-pop' : ''}`}>
                        <svg className={`${compact ? 'w-3.5 h-3.5' : 'w-5 h-5'} text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {justSelected.has(w.id) && <span className="animate-radiate-ring" />}
                    </>
                  ) : (
                    <img
                      src={w.iconSrc}
                      alt={`${w.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                <div className="flex-grow">
                  <div className={`${compact ? 'text-[12px]' : 'text-[16px]'} text-[#323232] leading-tight`}>
                    {w.name}
                  </div>
                </div>
              </div>

              {/* Points & Chevron */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1.5">
                  {!compact && (
                    <img
                      src={VelocityPointsIcon}
                      alt=""
                      className="w-[18px] h-[18px]"
                    />
                  )}
                  <div className="flex items-baseline space-x-1">
                    <span className={`${compact ? 'text-[12px]' : 'text-[16px]'} font-medium text-[#323232]`}>
                      {opaqueEarn ? maskPts(tier.pts) : tier.pts.toLocaleString()}
                    </span>
                    <span className={`${compact ? 'text-[9px]' : 'text-[10px]'} font-bold text-[#999999] uppercase`}>
                      PTS
                    </span>
                  </div>
                </div>

                <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                  <svg className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* EXPANDED CONTENT */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="px-5 pb-6 pt-2">

                {/* Heading: tier label + pts inline */}
                <div className="text-[12px] font-medium text-[#323232] leading-normal mb-4 px-1">
                  {TIER_LABELS[tierIdx] ?? TIER_LABELS[0]}:{' '}
                  {opaqueEarn ? maskPts(tier.pts) : tier.pts.toLocaleString()} pts in a year
                </div>

                {/* Slider */}
                <div className="relative w-full h-8 flex items-center mb-4 px-1">
                  {/* Background Track */}
                  <div className="absolute inset-x-1 h-2 bg-gray-200 rounded-full"></div>

                  {/* Active Track */}
                  <div
                    className="absolute left-1 h-1.5 bg-[#4C2F92] rounded-full pointer-events-none"
                    style={{
                      width: `calc(${(tierIdx / ((w.tiers?.length || 1) - 1)) * 100}% - 4px)`,
                      transition: 'width 0.4s linear'
                    }}
                  ></div>

                  {/* Tick Dots */}
                  <div className="absolute inset-x-1 flex justify-between pointer-events-none">
                    {(w.tiers || []).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transform translate-y-[1px] ${i <= tierIdx ? 'bg-[#4C2F92]' : 'bg-gray-400'
                          }`}
                        style={{ transition: 'background-color 0.4s linear' }}
                      />
                    ))}
                  </div>

                  {/* Real native slider with transparent track and visible thumb */}
                  <input
                    type="range"
                    min={0}
                    max={(w.tiers?.length ?? 1) - 1}
                    step={1}
                    value={tierIdx}
                    onChange={e => onTierChange(w.id, Number(e.target.value))}
                    className="absolute inset-0 w-full h-full cursor-pointer z-20"
                  />
                </div>

                {/* Earn example sentence + inline link */}
                {(onToggleEarnExample || onToggleFindOutMore) && (
                  <div className="text-[14px] md:text-[12px] text-[#323232] leading-normal mb-4 px-1">
                    {onToggleEarnExample && (
                      <div className="mb-4">
                        {isEarnExampleOpen && isExpanded ? (
                          <>
                            Showing an example of earning{' '}
                            {opaqueEarn ? maskPts(tier.pts) : tier.pts.toLocaleString()} pts with{' '}
                            {opaqueSpend ? maskSpend(String(tier.spend)) : `$${tier.spend?.toLocaleString()}`} spend in a year.{' '}
                            <button
                              onClick={(e) => { e.stopPropagation(); onToggleEarnExample(); }}
                              className="font-bold text-[#E40000] hover:underline inline-flex items-center group transition-colors"
                            >
                              Hide earn example
                              <svg className="w-3 h-3 ml-1 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <>
                            See an example of earning{' '}
                            {opaqueEarn ? maskPts(tier.pts) : tier.pts.toLocaleString()} pts with{' '}
                            {opaqueSpend ? maskSpend(String(tier.spend)) : `$${tier.spend?.toLocaleString()}`} spend in a year.{' '}
                            <button
                              onClick={(e) => { e.stopPropagation(); onToggleEarnExample(); }}
                              className="font-bold text-[#E40000] hover:underline inline-flex items-center group transition-colors"
                            >
                              Show earn example
                              <svg className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    )}

                    <div className="text-[14px] md:text-[12px] leading-normal text-[#323232] mb-4">
                      {w.desc}
                    </div>

                    {/* Find Out More Logic for Supported Cards */}
                    {onToggleFindOutMore && [1, 2, 4, 5, 6, 7, 11, 12, 15, 16, 17].includes(w.id) && (
                      <div>
                        {isFindOutMoreOpen && isExpanded ? (
                          <button
                            onClick={(e) => { e.stopPropagation(); onToggleFindOutMore(); }}
                            className="font-bold text-[#E40000] hover:underline inline-flex items-center group transition-colors"
                          >
                            Less information
                            <svg className="w-3 h-3 ml-1 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); onToggleFindOutMore(); }}
                            className="font-bold text-[#E40000] hover:underline inline-flex items-center group transition-colors"
                          >
                            More information
                            <svg className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
