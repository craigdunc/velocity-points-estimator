import React, { useState, useEffect, useRef } from 'react';
import ConnectedRewardCard from './ConnectedRewardCard';
import VelocityPointsIcon from '../assets/icons/velocity-points.svg';
import { useSaveSlots } from '../state/useSaveSlots';
import { maskPts } from '../utils/maskPts';

/**
 * StickyFooter
 * Props:
 * - totalPts: number
 * - selectedReward: reward object
 * - onHomepageClicked: () => void
 * - onExploreRewardsClicked: () => void
 */
export default function StickyFooter({
  totalPts,
  selectedReward,
  hasSelectedReward,
  onHomepageClicked,
  onExploreRewardsClicked,
  initialMinimized = false
}) {
  const [isMinimized, setIsMinimized] = useState(initialMinimized);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const { current } = useSaveSlots();
  const opaqueEarn = current?.opaqueEarn ?? false;

  // Sync state if prop changes (e.g. entering/leaving target mode)
  useEffect(() => {
    setIsMinimized(initialMinimized);
  }, [initialMinimized]);

  // Constants for minimizing logic
  const DRAGGABLE_HEIGHT = 420; // Approx height of expanded footer
  const MINIMIZED_THRESHOLD = 120; // Swipe down more than this to minimize
  const MINIMIZED_Y = DRAGGABLE_HEIGHT - 110; // Show only the header when minimized

  const toggleMinimized = () => setIsMinimized(!isMinimized);

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;

    // Resistance factor
    let newOffset = isMinimized ? MINIMIZED_Y + diff : diff;

    // Bounds check
    if (newOffset < -30) newOffset = -30; // Small overscroll up
    if (newOffset > MINIMIZED_Y + 50) newOffset = MINIMIZED_Y + 50;

    setDragOffset(newOffset);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    // Snap logic
    if (isMinimized) {
      if (dragOffset < MINIMIZED_Y - 50) {
        setIsMinimized(false);
      }
    } else {
      if (dragOffset > MINIMIZED_THRESHOLD) {
        setIsMinimized(true);
      }
    }
    setDragOffset(0);
  };

  const getTransform = () => {
    if (isDragging) {
      return `translateY(${dragOffset}px)`;
    }
    return isMinimized ? `translateY(${MINIMIZED_Y}px)` : 'translateY(0px)';
  };

  return (
    <div
      className="fixed bottom-0 inset-x-0 bg-white rounded-t-[28px] overflow-hidden z-[9000] shadow-[0_-12px_30px_rgba(0,0,0,0.12)] border-t border-gray-100 transform transition-all duration-300 ease-out"
      style={{
        transform: getTransform(),
        transitionDuration: isDragging ? '0ms' : '400ms'
      }}
    >
      {/* Drawer Handle */}
      <div
        className="flex justify-center pt-3 pb-1 cursor-pointer touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={toggleMinimized}
      >
        <div className="w-[60px] h-1.5 bg-gray-200 rounded-full" />
      </div>

      {/* Estimator Summary Header */}
      <div className="px-6 py-2">
        <div className="flex flex-col items-center">
          <div className="flex items-baseline space-x-1 flex-wrap justify-center">
            <span className="text-[15px] text-[#323232]">Target</span>
            <img src={VelocityPointsIcon} alt="" className="w-[16px] h-[18px] translate-y-0.5" />
            <span className="text-[16px] font-medium text-[#323232] leading-none">
              {opaqueEarn ? maskPts(totalPts || 0) : (totalPts ? totalPts.toLocaleString() : '0')}
            </span>
            <span className="text-[10px] font-bold text-[#999999] uppercase">PTS</span>
            <span className="text-[15px] text-[#323232] ml-1">a year from selected</span>
          </div>
        </div>
      </div>

      {/* Rewards Content Area */}
      <div className="transition-opacity duration-300 px-6" style={{ opacity: isMinimized ? 0 : 1 }}>
        <div className="flex justify-between items-center mb-3 mt-1">
          <h3 className="text-[14px] font-medium text-[#323232]">
            {selectedReward ? (hasSelectedReward ? 'Favourite reward:' : 'Example reward') : ''}
          </h3>
          <button
            onClick={onExploreRewardsClicked}
            className="text-[14px] font-medium text-[#E40000] hover:underline"
          >
            Explore rewards
          </button>
        </div>

        {selectedReward && (
          <ConnectedRewardCard
            reward={selectedReward}
          />
        )}

        <div className="py-4 pb-6">
          <button
            onClick={onHomepageClicked}
            className="w-full py-4.5 bg-[#E40000] font-medium tracking-[0.1em] text-white text-[16px] rounded-[10px] active:scale-[0.98] transition-all uppercase"
          >
            GO TO HOMEPAGE
          </button>
        </div>
      </div>
    </div>
  );
}