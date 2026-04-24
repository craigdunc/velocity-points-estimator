// src/components/MonthWrapUpModal.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import { WTEs } from '../data';
import LionSprite from './LionSprite';
import VelocityPointsIcon from '../assets/icons/velocity-points.svg';

/* ─── animated counter component ─── */
const AnimatedCounter = ({ target, duration = 1200 }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    let id;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(target * ease));
      if (p < 1) id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);
  return <>{val.toLocaleString()}</>;
};

/* ─── confetti burst overlay ─── */
const ConfettiOverlay = () => {
  const pieces = useMemo(() => {
    const colors = ['#D7F1F0', '#E40000', '#C3A56E', '#FFD700', '#BFF4F2', '#E40000', '#FF6B6B', '#4ECDC4'];
    return [...Array(24)].map((_, i) => {
      const angle = (i / 24) * Math.PI * 2 + (Math.random() * 0.3);
      const dist = 60 + Math.random() * 80;
      const size = 4 + Math.random() * 5;
      return { angle, dist, size, color: colors[i % colors.length], delay: i * 30 };
    });
  }, []);
  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {pieces.map((p, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/3 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `confetti-burst 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay}ms forwards`,
            '--cx': `${Math.cos(p.angle) * p.dist}px`,
            '--cy': `${Math.sin(p.angle) * p.dist}px`,
          }}
        />
      ))}
    </div>
  );
};

/* ─── circular progress ring ─── */
const ProgressRing = ({ percent, size = 90, strokeWidth = 5, color = '#E40000', bgColor = '#F3F5F7', children }) => {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (circ * Math.min(percent, 100)) / 100;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bgColor} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default function MonthWrapUpModal({ data, onClose, goTo }) {
  const { current, saveState } = useSaveSlots();
  const {
    monthName,
    totalEarned,
    totalTarget,
    earnedById = {},
    targetsById = {},
  } = data;

  const [phase, setPhase] = useState(1); // 1, 2, or 3
  const [bonusCollected, setBonusCollected] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animIn, setAnimIn] = useState(true);

  const hitOverall = totalEarned >= totalTarget;
  const overallPercent = Math.min(Math.round((totalEarned / (totalTarget || 1)) * 100), 100);

  /* lock body scroll while modal is open */
  useEffect(() => {
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => { body.style.overflow = prev; };
  }, []);

  /* -- compute best & worst WTEs by relative performance -- */
  const { bestWTE, worstWTE } = useMemo(() => {
    const entries = Object.entries(targetsById).map(([id, tgt]) => {
      const earned = earnedById[id] || 0;
      const ratio = tgt > 0 ? earned / tgt : 0;
      const wte = WTEs.find(w => w.id === +id) || { name: `Item ${id}`, iconSrc: '' };
      return { id, tgt, earned, ratio, wte };
    });

    if (entries.length === 0) return { bestWTE: null, worstWTE: null };

    entries.sort((a, b) => b.ratio - a.ratio);
    return { bestWTE: entries[0], worstWTE: entries[entries.length - 1] };
  }, [targetsById, earnedById]);

  const handleCollectBonus = useCallback(() => {
    saveState({
      currentPtsBalance: (current.currentPtsBalance || 0) + 50
    });
    setBonusCollected(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1500);
  }, [current, saveState]);

  const goToPhase = useCallback((nextPhase) => {
    setAnimIn(false);
    setTimeout(() => {
      setPhase(nextPhase);
      setAnimIn(true);
    }, 250);
  }, []);

  /* ───────────── PHASE 1: Overall Target ───────────── */
  const renderPhase1 = () => (
    <div className={`transition-all duration-300 ${animIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="shrink-0" style={{ width: 120, height: 130 }}>
          <LionSprite variant={hitOverall ? "coins" : "down"} scale={0.42} className="origin-bottom" />
        </div>
        <div className="flex-1">
          <h3 className="text-[18px] font-semibold text-[#323232] mb-1">{monthName} Wrap-up</h3>
          <p className="text-[14px] text-[#555] leading-relaxed">
            {hitOverall
              ? <>You met your {monthName} target! Great work. Let me give you <span className="font-bold text-[#E40000]">50 extra points</span>.</>
              : <>You didn't quite reach your {monthName} target, but you made good progress!</>
            }
          </p>
        </div>
      </div>

      {/* Target Summary Row */}
      <div className="flex items-center justify-center gap-8 mt-4">
        {/* Overall Target Ring */}
        <div className="flex flex-col items-center">
          <p className="text-[12px] font-medium text-[#666] mb-2 uppercase tracking-wide">{monthName} target</p>
          <ProgressRing
            percent={overallPercent}
            size={100}
            strokeWidth={6}
            color={hitOverall ? '#00A651' : '#E40000'}
          >
            <span className="text-[18px] font-bold text-[#323232] leading-none">
              <AnimatedCounter target={totalEarned} />
            </span>
            <span className="text-[11px] text-[#888] mt-0.5">{totalTarget.toLocaleString()}</span>
          </ProgressRing>
          {hitOverall && (
            <span className="mt-2 text-[12px] font-bold text-[#00A651] uppercase tracking-wider animate-duo-entrance">
              ✓ Target Met!
            </span>
          )}
        </div>

        {/* Per-WTE mini rings */}
        <div className="flex gap-4 flex-wrap justify-center">
          {Object.entries(targetsById).map(([id, tgt]) => {
            const earned = earnedById[id] || 0;
            const met = earned >= tgt;
            const pct = Math.min(Math.round((earned / (tgt || 1)) * 100), 100);
            const wte = WTEs.find(w => w.id === +id) || { name: id, iconSrc: '' };
            return (
              <div key={id} className="flex flex-col items-center w-[80px]">
                <p className="text-[10px] font-medium text-[#666] text-center mb-1 h-[28px] flex items-center justify-center leading-tight">{wte.name}</p>
                <ProgressRing
                  percent={pct}
                  size={70}
                  strokeWidth={4.5}
                  color={met ? '#00A651' : '#E40000'}
                >
                  <img src={wte.iconSrc} alt="" className="w-[20px] h-[20px] object-contain mb-0.5" />
                  <span className="text-[11px] font-bold text-[#323232] leading-none">{earned.toLocaleString()}</span>
                  <span className="text-[9px] text-[#999]">{tgt.toLocaleString()}</span>
                </ProgressRing>
                {met ? (
                  <span className="mt-1 text-[10px] font-bold text-[#00A651] uppercase tracking-wide">Great!</span>
                ) : (
                  <button
                    onClick={() => goToPhase(3)}
                    className="mt-1 text-[10px] font-medium text-[#E40000] hover:underline"
                  >
                    Help me
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bonus Section */}
      {hitOverall && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          {!bonusCollected ? (
            <div className="flex items-center justify-center gap-5 animate-duo-entrance">
              <button
                onClick={handleCollectBonus}
                className="bg-white text-[#E40000] px-7 py-2.5 rounded-full border-2 border-[#E40000] font-semibold text-[14px] hover:bg-red-50 transition-all active:scale-95 shadow-sm"
              >
                Accept 50 pts
              </button>
              <button
                onClick={() => goToPhase(2)}
                className="text-[14px] text-[#888] hover:underline"
              >
                Skip
              </button>
            </div>
          ) : (
            <div className="text-center animate-duo-entrance">
              <p className="text-[14px] font-semibold text-[#00A651] mb-3">+50 points added to your balance!</p>
              <button
                onClick={() => goToPhase(2)}
                className="bg-white text-[#E40000] px-8 py-2.5 rounded-full border border-[#E40000] font-semibold text-[14px] hover:bg-red-50 transition-all active:scale-95"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* If not hit overall, just show next button */}
      {!hitOverall && (
        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
          <button
            onClick={() => goToPhase(2)}
            className="bg-white text-[#E40000] px-8 py-2.5 rounded-full border border-[#E40000] font-semibold text-[14px] hover:bg-red-50 transition-all active:scale-95"
          >
            Next
          </button>
        </div>
      )}

      {showConfetti && <ConfettiOverlay />}
    </div>
  );

  /* ───────────── PHASE 2: Best Performer ───────────── */
  const renderPhase2 = () => {
    if (!bestWTE) return null;
    const pct = Math.round(bestWTE.ratio * 100);
    const metTarget = bestWTE.earned >= bestWTE.tgt;

    return (
      <div className={`transition-all duration-300 ${animIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-4 mb-5">
          <div className="shrink-0" style={{ width: 120, height: 130 }}>
            <LionSprite variant="bling" scale={0.42} className="origin-bottom" />
          </div>
          <div className="flex-1">
            <h3 className="text-[18px] font-semibold text-[#323232] mb-1">Your Star Performer ⭐</h3>
            <p className="text-[14px] text-[#555] leading-relaxed">
              <span className="font-bold text-[#323232]">{bestWTE.wte.name}</span> was your strongest earner this month
              {metTarget ? ', exceeding' : ', reaching'} <span className="font-bold text-[#00A651]">{pct}%</span> of your target.
            </p>
          </div>
        </div>

        {/* Visual Card */}
        <div className="bg-gradient-to-r from-[#F0FAF9] to-[#FFF9F0] rounded-[16px] p-5 border border-[#E8F4F3] mb-4">
          <div className="flex items-center gap-4">
            <ProgressRing percent={pct} size={80} strokeWidth={5} color="#00A651">
              <img src={bestWTE.wte.iconSrc} alt="" className="w-[24px] h-[24px] object-contain" />
            </ProgressRing>
            <div className="flex-1">
              <p className="text-[16px] font-semibold text-[#323232] mb-1">{bestWTE.wte.name}</p>
              <p className="text-[13px] text-[#666]">
                Earned <span className="font-bold text-[#323232]">{bestWTE.earned.toLocaleString()}</span> of {bestWTE.tgt.toLocaleString()} pts target
              </p>
              {metTarget && (
                <p className="text-[12px] font-bold text-[#00A651] mt-1">🎯 Target exceeded!</p>
              )}
            </div>
          </div>
        </div>

        <p className="text-[13px] text-[#777] leading-relaxed mb-5">
          {metTarget
            ? `Keep it up! ${bestWTE.wte.name} is clearly working well for you. Consider exploring more ways to maximise this channel.`
            : `Great progress with ${bestWTE.wte.name}! This was your relatively strongest earning channel. A little more focus could tip it over the target next month.`
          }
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => goToPhase(3)}
            className="bg-white text-[#E40000] px-8 py-2.5 rounded-full border border-[#E40000] font-semibold text-[14px] hover:bg-red-50 transition-all active:scale-95"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  /* ───────────── PHASE 3: Worst Performer ───────────── */
  const renderPhase3 = () => {
    if (!worstWTE) return null;
    const pct = Math.round(worstWTE.ratio * 100);

    return (
      <div className={`transition-all duration-300 ${animIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-4 mb-5">
          <div className="shrink-0" style={{ width: 120, height: 130 }}>
            <LionSprite variant="ah" scale={0.42} className="origin-bottom" />
          </div>
          <div className="flex-1">
            <h3 className="text-[18px] font-semibold text-[#323232] mb-1">Room to Grow 🌱</h3>
            <p className="text-[14px] text-[#555] leading-relaxed">
              <span className="font-bold text-[#323232]">{worstWTE.wte.name}</span> was your toughest earner this month,
              reaching <span className="font-bold text-[#E40000]">{pct}%</span> of your target.
            </p>
          </div>
        </div>

        {/* Visual Card */}
        <div className="bg-gradient-to-r from-[#FFF5F5] to-[#FFF9F5] rounded-[16px] p-5 border border-[#FFE5E5] mb-4">
          <div className="flex items-center gap-4">
            <ProgressRing percent={pct} size={80} strokeWidth={5} color="#E40000">
              <img src={worstWTE.wte.iconSrc} alt="" className="w-[24px] h-[24px] object-contain" />
            </ProgressRing>
            <div className="flex-1">
              <p className="text-[16px] font-semibold text-[#323232] mb-1">{worstWTE.wte.name}</p>
              <p className="text-[13px] text-[#666]">
                Earned <span className="font-bold text-[#323232]">{worstWTE.earned.toLocaleString()}</span> of {worstWTE.tgt.toLocaleString()} pts target
              </p>
              <p className="text-[12px] font-medium text-[#E40000] mt-1">
                {worstWTE.tgt - worstWTE.earned > 0 ? `${(worstWTE.tgt - worstWTE.earned).toLocaleString()} pts short` : 'Almost there!'}
              </p>
            </div>
          </div>
        </div>

        <p className="text-[13px] text-[#777] leading-relaxed mb-5">
          Don't worry — I can help you find ways to maximise your earning from {worstWTE.wte.name}. Would you like me to show you some tips?
        </p>

        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => {
              onClose();
              if (goTo) goTo(3, { initialExpandId: worstWTE.wte.id, openMoreInfo: true });
            }}
            className="bg-white text-[#E40000] px-7 py-2.5 rounded-full border-2 border-[#E40000] font-semibold text-[14px] hover:bg-red-50 transition-all active:scale-95 shadow-sm"
          >
            Help me
          </button>
          <button
            onClick={onClose}
            className="text-[14px] text-[#888] hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  /* ───────────── render ───────────── */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-[640px] max-h-[90vh] overflow-y-auto rounded-[24px] bg-white p-7 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 transition-colors z-40"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Phase indicator dots */}
        <div className="flex justify-center gap-2 mb-5">
          {[1, 2, 3].map(p => (
            <div
              key={p}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${p === phase ? 'bg-[#E40000] scale-125' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        {/* Content */}
        {phase === 1 && renderPhase1()}
        {phase === 2 && renderPhase2()}
        {phase === 3 && renderPhase3()}
      </div>
    </div>
  );
}
