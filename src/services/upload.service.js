export const uploadService = {
  uploadImages,
}

async function uploadImages(ev) {
  const CLOUD_NAME = 'dzqnyehxn'
  const UPLOAD_PRESET = 'fuhrsp2z'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  try {
    const formData = new FormData()
    const uploadedUrls = []

    for (let i = 0; i < ev.target.files.length; i++) {
      formData.append('upload_preset', UPLOAD_PRESET)
      formData.append('file', ev.target.files[i])

      const res = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData,
      })

      const imgUrl = await res.json()
      uploadedUrls.push(imgUrl.secure_url)
    }

    return uploadedUrls
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}
