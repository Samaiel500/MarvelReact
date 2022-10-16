import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        setLoaded(true);
        setProcess('loaded');

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
            setProcess('error');
            throw e;
        }
    }, [])

    const clearError = useCallback(() => {
        setError(null);
        setProcess('loaded');
    }, []);

    return { loaded, error, request, clearError, process, setProcess }
}