// app/providers.tsx
// Providers para funcionalidades client-side

'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '@/lib/analytics';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track pageviews automaticamente
  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      analytics.page.view(pathname, { url });
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}