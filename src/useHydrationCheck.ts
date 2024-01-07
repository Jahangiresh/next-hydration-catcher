// src/useHydrationCheck.ts
import { useEffect } from 'react';
import { checkHydration, HydrationError } from './checkHydration';

interface UseHydrationCheckOptions {
  componentName: string;
}

export const useHydrationCheck = ({ componentName }: UseHydrationCheckOptions) => {
  useEffect(() => {
    const htmlContent = document.querySelector(`#${componentName}`)?.outerHTML;

    if (htmlContent) {
      const hydrationErrors: HydrationError[] = checkHydration(htmlContent);

      if (hydrationErrors.length > 0) {
        console.error(`Hydration errors in ${componentName}:`, hydrationErrors);
      }
    }
  }, [componentName]);
};
