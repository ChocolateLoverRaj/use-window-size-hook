import * as React from 'react';

import { UseWindowSizeOptions, UseWindowSizeResult } from '../interfaces';
import defaultBreakpoints from '../constants/defaultBreakpoints';
import getWindowSize from '../utils/getWindowSize';
import useDidMount from './useDidMount';

/**
 * Default hook options.
 */
const defaultOptions = {
  useDebounce: true,
  debounceTimeMs: 200,
  breakpoints: defaultBreakpoints,
};

/**
 * Hook that monitors window size, and updates the object at the end of each window resize.
 * It also returns the actual screen layout - one of xl, lg, md, sm, xs.
 */
const useWindowSize = (
  options: UseWindowSizeOptions = defaultOptions,
): UseWindowSizeResult => {
  const hasWindowObject = React.useMemo(() => (
    typeof window === 'object'
  ), []);

  const breakpoints = React.useMemo(() => (
    options.breakpoints ?? defaultOptions.breakpoints
  ), [options]);

  const useDebounce = React.useMemo(() => (
    options.useDebounce ?? defaultOptions.useDebounce
  ), [options]);

  const debounceTimeMs = React.useMemo(() => (
    options.debounceTimeMs ?? defaultOptions.debounceTimeMs
  ), [options]);

  const [windowSize, setWindowSize] = React.useState<UseWindowSizeResult>(getWindowSize({
    hasWindowObject,
    breakpoints,
  }));

  useDidMount(() => {
    if (!hasWindowObject) {
      return () => {};
    }

    let resizeHandler: any;

    const handleResize = () => {
      if (!useDebounce) {
        setWindowSize(getWindowSize({
          hasWindowObject,
          breakpoints,
        }));

        return;
      }

      clearTimeout(resizeHandler);

      resizeHandler = setTimeout(() => {
        setWindowSize(getWindowSize({
          hasWindowObject,
          breakpoints,
        }));
      }, debounceTimeMs);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return windowSize;
};

export default useWindowSize;
