import React, { useState, useEffect, useRef } from 'react';
import LionIdle   from '../assets/images/sprites/lion-idle.png';
import LionDown   from '../assets/images/sprites/lion-down.png';
import LionAh     from '../assets/images/sprites/lion-ah.png';
import LionTravel from '../assets/images/sprites/lion-travel.png';
import LionTick   from '../assets/images/sprites/lion-tick.png';
import LionBig    from '../assets/images/sprites/lion-big.png';
import LionMap    from '../assets/images/sprites/lion-map.png';
import LionShop   from '../assets/images/sprites/lion-shop.png';
import LionCard   from '../assets/images/sprites/lion-card.png';
import LionCoins  from '../assets/images/sprites/lion-coins.png';
import LionBling  from '../assets/images/sprites/lion-bling.png';
import LionForYou from '../assets/images/sprites/lion-foryou.png';
import LionMagic      from '../assets/images/sprites/lion-magic.png';
import LionMagicShot  from '../assets/images/sprites/lion-magic-shot.png';
import LionBubble     from '../assets/images/sprites/lion-bubble.png';
import LionThink      from '../assets/images/sprites/lion-think.png';

// Per-frame dimensions (spritesheet total ÷ 6 cols × 6 rows = 36 frames)
const SPRITE_CONFIG = {
  idle:   { src: LionIdle,   width: 290, height: 420, loop: true },
  down:   { src: LionDown,   width: 640, height: 640, loop: true },
  ah:     { src: LionAh,     width: 396, height: 524, loop: true },
  travel: { src: LionTravel, width: 406, height: 540, loop: 3 },
  tick:   { src: LionTick,   width: 428, height: 476, loop: 3 },
  big:    { src: LionBig,    width: 400, height: 494, loop: 'slider' },
  map:    { src: LionMap,    width: 524, height: 504, loop: 3 },
  shop:   { src: LionShop,   width: 506, height: 528, loop: 3 },
  card:   { src: LionCard,   width: 454, height: 520, loop: false },
  coins:  { src: LionCoins,  width: 640, height: 640, loop: 3 },
  bling:  { src: LionBling,  width: 376, height: 522, loop: 3 },
  foryou: { src: LionForYou, width: 536, height: 494, loop: false },
  magic:     { src: LionMagic,     width: 444, height: 502, loop: 3 },
  magicshot: { src: LionMagicShot, width: 640, height: 640, loop: false },
  bubble:    { src: LionBubble,    width: 334, height: 282, loop: true },
  think:     { src: LionThink,     width: 378, height: 518, loop: false },
};

const FADE_MS = 220;

function SpriteLayer({ variantKey, frameIdx, scale, targetHeight, style = {} }) {
  const config = SPRITE_CONFIG[variantKey] || SPRITE_CONFIG.idle;
  const effectiveScale = targetHeight != null ? targetHeight / config.height : scale;
  const fw = config.width  * effectiveScale;
  const fh = config.height * effectiveScale;
  const x  = (frameIdx % 6) * fw;
  const y  = Math.floor(frameIdx / 6) * fh;
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0,
      width: fw, height: fh,
      backgroundImage:    `url(${config.src})`,
      backgroundSize:     `${config.width * 6 * effectiveScale}px ${config.height * 6 * effectiveScale}px`,
      backgroundPosition: `-${x}px -${y}px`,
      backgroundRepeat:   'no-repeat',
      ...style,
    }} />
  );
}

export default function LionSprite({ className = '', style = {}, variant = 'idle', scale = 1, targetHeight = null, maxLoops = 3, onComplete = null }) {
  const [frame, setFrame] = useState(0);
  const [activeVariant, setActiveVariant] = useState(variant);
  const [prevLayer, setPrevLayer] = useState(null); // { variant, frame } frozen at swap moment
  const frameRef = useRef(0);
  const loopCountRef = useRef(0);

  // Cross-fade on variant change
  useEffect(() => {
    setPrevLayer({ variant: activeVariant, frame: frameRef.current });
    setActiveVariant(variant);
    const t = setTimeout(() => setPrevLayer(null), FADE_MS + 50);
    return () => clearTimeout(t);
  }, [variant]); // eslint-disable-line react-hooks/exhaustive-deps

  const config = SPRITE_CONFIG[activeVariant] || SPRITE_CONFIG.idle;
  const loopMode = config.loop; // true | false | 'slider' | number (loop N times, hold last frame)
  const loop = loopMode !== false && typeof loopMode !== 'number';
  const isContinuous = activeVariant === 'idle' || activeVariant === 'bubble';
  const cols = 6, totalFrames = 36;

  useEffect(() => {
    frameRef.current = 0;
    setFrame(0);
    loopCountRef.current = 0;

    let isCancelled = false;
    let timerId = null;

    const playLoop = () => {
      if (isCancelled) return;
      frameRef.current = 0;
      setFrame(0);
      let nextFrame = 0;
      timerId = setInterval(() => {
        if (isCancelled) { clearInterval(timerId); return; }
        nextFrame++;
        if (config.loop === 'slider') {
          if (nextFrame >= totalFrames) {
            clearInterval(timerId);
            frameRef.current = totalFrames - 1;
            setFrame(totalFrames - 1);
            return;
          }
          frameRef.current = nextFrame; setFrame(nextFrame);
        } else if (typeof loopMode === 'number') {
          if (nextFrame >= totalFrames) {
            clearInterval(timerId);
            loopCountRef.current++;
            if (loopCountRef.current < loopMode) {
              frameRef.current = 0; setFrame(0);
              timerId = setTimeout(playLoop, 1000);
            } else {
              frameRef.current = totalFrames - 1; setFrame(totalFrames - 1);
            }
          } else {
            frameRef.current = nextFrame; setFrame(nextFrame);
          }
        } else if (!loop) {
          if (nextFrame >= totalFrames - 1) {
            clearInterval(timerId);
            frameRef.current = totalFrames - 1;
            setFrame(totalFrames - 1);
            if (onComplete) {
              timerId = setTimeout(() => {
                if (!isCancelled) { setActiveVariant('idle'); onComplete(); }
              }, 800);
            }
          } else {
            frameRef.current = nextFrame; setFrame(nextFrame);
          }
        } else {
          if (nextFrame >= totalFrames) {
            clearInterval(timerId);
            frameRef.current = 0; setFrame(0);
            if (isContinuous) {
              timerId = setTimeout(playLoop, 1000);
            } else {
              loopCountRef.current++;
              if (loopCountRef.current < maxLoops) {
                timerId = setTimeout(playLoop, 1000);
              } else {
                timerId = setTimeout(() => {
                  if (!isCancelled) { setActiveVariant('idle'); if (onComplete) onComplete(); }
                }, 1000);
              }
            }
          } else {
            frameRef.current = nextFrame; setFrame(nextFrame);
          }
        }
      }, 1000 / 24);
    };

    timerId = setTimeout(playLoop, isContinuous ? 0 : 1000);
    return () => { isCancelled = true; clearTimeout(timerId); clearInterval(timerId); };
  }, [activeVariant, loop, isContinuous, config.loop]);

  // Ping-pong slider for 'big' variant
  useEffect(() => {
    if (activeVariant !== 'big') return;
    let isCancelled = false, timerId = null, forward = true;
    const tick = () => {
      if (isCancelled) return;
      setFrame(prev => {
        let nxt = forward ? prev + 1 : prev - 1;
        if (nxt >= totalFrames - 1 && forward) {
          nxt = totalFrames - 1; forward = false;
          clearInterval(timerId);
          setTimeout(() => { if (!isCancelled) timerId = setInterval(tick, 1000 / 24); }, 1000);
        } else if (nxt <= 0 && !forward) {
          nxt = 0; forward = true;
          clearInterval(timerId);
          setTimeout(() => { if (!isCancelled) timerId = setInterval(tick, 1000 / 24); }, 1000);
        }
        return nxt;
      });
    };
    const startTimeout = setTimeout(() => { if (isCancelled) return; timerId = setInterval(tick, 1000 / 24); }, 1000);
    return () => { isCancelled = true; clearTimeout(startTimeout); clearInterval(timerId); };
  }, [activeVariant]);

  const effectiveScale = targetHeight != null ? targetHeight / config.height : scale;
  const frameWidth  = config.width  * effectiveScale;
  const frameHeight = config.height * effectiveScale;

  return (
    <div
      className={`inline-block ${className}`}
      style={{ ...style, position: 'relative', width: frameWidth, height: frameHeight }}
    >
      {/* Outgoing sprite — frozen at last frame, fades out */}
      {prevLayer && (
        <SpriteLayer
          variantKey={prevLayer.variant}
          frameIdx={prevLayer.frame}
          scale={scale}
          targetHeight={targetHeight}
          style={{ animation: `sprite-fadeout ${FADE_MS}ms ease forwards`, zIndex: 1 }}
        />
      )}
      {/* Incoming sprite — fades in */}
      <SpriteLayer
        variantKey={activeVariant}
        frameIdx={frame}
        scale={scale}
        targetHeight={targetHeight}
        style={{ animation: prevLayer ? `sprite-fadein ${FADE_MS}ms ease forwards` : undefined, zIndex: 2 }}
      />
    </div>
  );
}
