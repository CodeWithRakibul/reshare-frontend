import React from 'react';

export default function Heading({ children }: { children: React.ReactNode }) {
    return <h1 className='text-foreground text-base font-medium'>{children}</h1>;
}
