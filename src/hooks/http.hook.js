import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        setLoaded(true);

        try {
            const response = await fetch(url, { method, body, headers });
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status ${response.status}`);
            }
            const data = await response.json();
            setLoaded(false);
            return data;
        } catch (e) {
            setLoaded(false);
            setError(e.message);
            throw e;
        }
    }, [])

    const clearError = useCallback(() => setError(null), []);

    return { loaded, error, request, clearError }
}