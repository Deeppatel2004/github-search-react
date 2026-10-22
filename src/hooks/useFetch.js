import { useState, useEffect } from 'react';

import {
  shouldFetch,
  toStatus,
  errorFor
} from '../helpers';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!shouldFetch(url)) return;

    let cancelled = false;

    async function run() {
      setLoading(true);
      setError('');
      setData(null);

      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(String(res.status));
        }

        const result = await res.json();

        if (!cancelled) {
          setData(result);
        }
      } catch (e) {
        if (!cancelled) {
          setError(errorFor(toStatus(e)));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}