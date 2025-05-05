"use client"

import { memo } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SelectedFilesBarProps {
    selectedCount: number
    onDelete: () => void
}

function SelectedFilesBarComponent({ selectedCount, onDelete }: SelectedFilesBarProps) {
    if (selectedCount === 0) return null

    return (
        <Button variant="destructive" size="sm" onClick={onDelete} className="flex items-center gap-1">
            <Trash2 size={14} />
            Delete
        </Button>
    )
}

// Memoize the component for better performance
export const SelectedFilesBar = memo(SelectedFilesBarComponent)
