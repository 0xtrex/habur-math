import fs from "fs"
import path from "path"
import GalleryClient from "./GalleryClient"

export default function Gallery(){

const galleryPath = path.join(process.cwd(),"public/gallery")

const files = fs.readdirSync(galleryPath)

const images = files.map(file => `/gallery/${file}`)

return <GalleryClient images={images} />

}
