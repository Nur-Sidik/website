import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

type UploadResult =
  | { ok: true; url: string }
  | { ok: false; message: string }

// Mengunggah foto ke Cloudinary. Mengembalikan alamat (URL) foto kalau berhasil.
export async function uploadImage(file: File, name: string): Promise<UploadResult> {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.error("Pengaturan CLOUDINARY_* di .env belum lengkap")
    return { ok: false, message: "Pengaturan penyimpanan foto belum lengkap." }
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { ok: false, message: "Format foto harus JPG, PNG, atau WEBP." }
  }

  if (file.size > MAX_SIZE) {
    return { ok: false, message: "Ukuran foto maksimal 5 MB." }
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())

    const url = await new Promise<string>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "desa-banaran",
            public_id: `${Date.now()}-${name}`,
            resource_type: "image",
          },
          (error, result) => {
            if (error || !result) reject(error ?? new Error("Upload gagal"))
            else resolve(result.secure_url)
          }
        )
        .end(buffer)
    })

    return { ok: true, url }
  } catch (error) {
    console.error("Gagal mengunggah foto:", error)
    return { ok: false, message: "Gagal mengunggah foto. Coba lagi." }
  }
}

// Menghapus foto dari Cloudinary (foto lama /images/... dan /uploads/... diabaikan).
export async function deleteImage(url: string | null | undefined) {
  if (!url || !url.includes("res.cloudinary.com")) return

  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/)
    if (!match) return
    await cloudinary.uploader.destroy(match[1])
  } catch (error) {
    console.error("Gagal menghapus foto di Cloudinary:", error)
  }
}