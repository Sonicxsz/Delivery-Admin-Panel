import { Input } from "@mui/material"
import { useState } from "react"
import './ImageViewer.css'
import { base } from "../../../app/http/http"

export function ImageViewer({
  initial,
  onFileChange,
  name = "image",
}: {
  initial: string
  onFileChange?: (file: File | null) => void
  name?: string
}) {
  const [file, setFile] = useState<{ preview: string; value: File } | null>(null)
  const [error, setError] = useState<null | string>(null)

  const changeImage = (file: File) => {
    const preview = URL.createObjectURL(file)
    setFile({ preview, value: file })
    onFileChange?.(file)
  }

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const file = e.target.files[0]
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"]

    if (file && allowedTypes.includes(file.type)) {
      const img = new Image()
      img.src = URL.createObjectURL(file)

      img.onload = () => {
        changeImage(file)
      }
    } else {
      setError("Неверный формат файла")
    }
  }

  return (
    <div className="image-wrapper">
      <div className="image-wrapper__image">
        <img src={(file && file.preview) || base + initial} alt="pick image" />
      </div>
      {error && <span className="error_text">{error}</span>}
      <Input name={name} type="file" onChange={handleChangeAvatar} />
    </div>
  )
}