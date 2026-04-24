import React, { useState, useEffect } from 'react';

const HTMLTypewriter = ({ html, onComplete, speed = 30 }) => {
    const [displayedHTML, setDisplayedHTML] = useState('');

    useEffect(() => {
        let currentHTML = '';
        setDisplayedHTML('');
        let i = 0;

        let audioCtx = null;
        try {
            if (window.AudioContext || window.webkitAudioContext) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
        } catch { /* ignore audio context error */ }

        const playBlip = () => {
            if (!audioCtx) return;
            if (audioCtx.state === 'suspended') audioCtx.resume();

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            // A rapid pitch drop on a triangle/square wave creates a percussive 'click' or 'tick'
            osc.type = 'triangle';

            osc.frequency.setValueAtTime(320 + Math.random() * 80, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.018);

            gain.gain.setValueAtTime(0, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.04 + (Math.random() * 0.01), audioCtx.currentTime + 0.002);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.025);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.025);
        };

        const timer = setInterval(() => {
            if (i < html.length) {
                if (html[i] === '<') {
                    const tagEnd = html.indexOf('>', i);
                    if (tagEnd !== -1) {
                        currentHTML += html.slice(i, tagEnd + 1);
                        i = tagEnd + 1;
                        setDisplayedHTML(currentHTML);
                        return;
                    }
                }

                if (html[i] === '&') {
                    const tagEnd = html.indexOf(';', i);
                    if (tagEnd !== -1 && tagEnd - i < 10) {
                        currentHTML += html.slice(i, tagEnd + 1);
                        i = tagEnd + 1;
                    } else {
                        currentHTML += html[i];
                        i++;
                    }
                } else {
                    currentHTML += html[i];
                    i++;
                }

                setDisplayedHTML(currentHTML);
                if (Math.random() > 0.4) {
                    playBlip();
                }

            } else {
                clearInterval(timer);
                if (onComplete) onComplete();
            }
        }, speed);

        return () => {
            clearInterval(timer);
            if (audioCtx) {
                audioCtx.close().catch(() => { });
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [html, speed]);

    return (
        <span className="grid text-left">
            <span dangerouslySetInnerHTML={{ __html: html }} className="invisible col-start-1 row-start-1" />
            <span dangerouslySetInnerHTML={{ __html: displayedHTML }} className="col-start-1 row-start-1" />
        </span>
    );
};

export default HTMLTypewriter;
