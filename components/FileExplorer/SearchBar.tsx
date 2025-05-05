"use client"

import type React from "react"

import { memo } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
    isSearchOpen: boolean
    searchQuery: string
    setSearchQuery: (query: string) => void
    toggleSearch: () => void
    searchInputRef: React.RefObject<HTMLInputElement>
}

function SearchBarComponent({
    isSearchOpen,
    searchQuery,
    setSearchQuery,
    toggleSearch,
    searchInputRef,
}: SearchBarProps) {
    return isSearchOpen ? (
        <div className="relative">
            <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search files and folders..."
                className="w-64 pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={toggleSearch}
            >
                <X size={16} />
            </button>
        </div>
    ) : (
        <Button variant="secondary" size="icon" onClick={toggleSearch}>
            <Search className="text-neutral-500" size={18} />
        </Button>
    )
}

// Memoize the component for better performance
export const SearchBar = memo(SearchBarComponent)
