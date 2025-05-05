import { FileText, File } from "lucide-react"
import Image from "next/image"
import folderIcon from "../../public/assets/folder.svg"
import imageIcon from "../../public/assets/image.svg"
import videoIcon from "../../public/assets/video.svg"
import otherIcon from "../../public/assets/other.svg"

interface FileIconProps {
    type: string
    size?: number
}

export function FileIcon({ type, size = 20 }: FileIconProps) {
    switch (type) {
        case "folder":
            return <Image src={folderIcon} alt="Folder" width={size} height={size} />
        case "image":
            return <Image src={imageIcon} alt="Image" width={size} height={size} />
        case "video":
            return <Image src={videoIcon} alt="Video" width={size} height={size} />
        case "document":
            return <FileText size={size} className="text-blue-500" />
        case "other":
            return <Image src={otherIcon} alt="Other" width={size} height={size} />
        default:
            return <File size={size} className="text-blue-500" />
    }
}
