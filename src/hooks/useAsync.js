import { useCallback, useEffect, useRef, useState } from "react";

const INITIAL = { data: null, loading: true, error: null };

/**
 * Runs an async function whenever `deps` change, ignores results from
 * outdated runs, and exposes a `reload` trigger.
 */
export function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState(INITIAL);
  const [version, setVersion] = useState(0);
  const fnRef = useRef(asyncFn);
  fnRef.current = asyncFn;

  useEffect(() => {
    let active = true;
    setState(INITIAL);

    const run = async () => {
      try {
        const data = await fnRef.current();
        if (active) setState({ data, loading: false, error: null });
      } catch (error) {
        if (active) setState({ data: null, loading: false, error });
      }
    };

    run();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, version]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);

  return { ...state, reload };
}
