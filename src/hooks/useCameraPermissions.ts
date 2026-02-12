import { useState, useCallback } from 'react';

export function useCameraPermissions() {
    const [permissionState, setPermissionState] = useState<PermissionState | 'unknown'>('unknown');
    const [error, setError] = useState<Error | null>(null);

    const requestPermission = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            // Stop the stream immediately, checks permission only
            stream.getTracks().forEach(track => track.stop());
            setPermissionState('granted');
            return true;
        } catch (err) {
            setPermissionState('denied');
            setError(err as Error);
            return false;
        }
    }, []);

    return { permissionState, requestPermission, error };
}
