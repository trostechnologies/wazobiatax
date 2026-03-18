import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export const ReloadPrompt: React.FC = () => {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r);
        },
        onRegisterError(error) {
            console.log('SW registration error', error);
        },
    });

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    if (!offlineReady && !needRefresh) return null;

    return (
        <div className="fixed right-0 bottom-0 m-4 p-3 border rounded-lg bg-white shadow-xl z-[9999] max-w-[300px]">
            <div className="mb-2 text-sm font-medium">
                {offlineReady ? (
                    <span>App ready to work offline</span>
                ) : (
                    <span>New content available, click on reload button to update.</span>
                )}
            </div>
            <div className="flex gap-2">
                {needRefresh && (
                    <button
                        className="px-3 py-1 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-700 transition"
                        onClick={() => updateServiceWorker(true)}
                    >
                        Reload
                    </button>
                )}
                <button
                    className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50 transition"
                    onClick={() => close()}
                >
                    Close
                </button>
            </div>
        </div>
    );
};
