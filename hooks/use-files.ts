'use client';

import { useFileContext } from '@/provider/FileContext';

export function useFiles() {
    // Simply return the context
    return useFileContext();
}
