"use client"

import type React from "react"

import { memo } from "react"
import { Check, Upload } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

interface UploadDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    isUploading: boolean
    uploadSuccess: boolean
    uploadProgress: number
    dropZoneRef: React.RefObject<HTMLDivElement>
    onUploadClick: () => void
    onDrop: (e: React.DragEvent) => void
}

function UploadDialogComponent({
    isOpen,
    onOpenChange,
    isUploading,
    uploadSuccess,
    uploadProgress,
    dropZoneRef,
    onUploadClick,
    onDrop,
}: UploadDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Upload Files</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    {isUploading || uploadSuccess ? (
                        <div className="space-y-4">
                            <Progress value={uploadProgress} className="h-2 w-full" />
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">
                                    {uploadSuccess ? "Upload complete!" : `Uploading... ${uploadProgress}%`}
                                </span>
                                {uploadSuccess && (
                                    <div className="flex items-center text-green-500">
                                        <Check size={16} className="mr-1" />
                                        <span className="text-sm">Complete</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div
                                ref={dropZoneRef}
                                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={onUploadClick}
                                onDragOver={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    e.currentTarget.classList.add("border-blue-500", "bg-blue-50")
                                }}
                                onDragLeave={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    e.currentTarget.classList.remove("border-blue-500", "bg-blue-50")
                                }}
                                onDrop={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    e.currentTarget.classList.remove("border-blue-500", "bg-blue-50")
                                    onDrop(e)
                                }}
                            >
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                    >
                                        <span>Upload files</span>
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, PDF, DOCX up to 10MB</p>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

// Memoize the component for better performance
export const UploadDialog = memo(UploadDialogComponent)
