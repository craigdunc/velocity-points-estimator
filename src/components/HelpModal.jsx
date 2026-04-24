// src/components/HelpModal.jsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function HelpModal({ isOpen, onClose }) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="font-semibold text-gray-900">Let's get you some points</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 transition-colors"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Select ways of earning Velocity Points to add to your dashboard. You can change your selection at any time.
                    </p>
                </div>
                <div className="p-4 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-red-600 text-white text-sm font-semibold tracking-widest rounded-sm transition-colors uppercase"
                    >
                        GOT IT
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
