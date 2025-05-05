"use client"

import { memo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CreateFolderDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onCreateFolder: (folderName: string) => boolean
}

function CreateFolderDialogComponent({ isOpen, onOpenChange, onCreateFolder }: CreateFolderDialogProps) {
    const [folderName, setFolderName] = useState("")

    const handleCreateFolder = () => {
        if (onCreateFolder(folderName)) {
            setFolderName("")
            onOpenChange(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create New Folder</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input
                        placeholder="Folder name"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        autoFocus
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreateFolder}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Memoize the component for better performance
export const CreateFolderDialog = memo(CreateFolderDialogComponent)
