import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded = null }) {
  const [imgData, setImgData] = useState({
    imgUrls: [], // Store multiple image URLs in an array.
  })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)

    const uploadedUrls = await uploadService.uploadImages(ev)
    setImgData({ imgUrls: uploadedUrls })
    setIsUploading(false)

    onUploaded && onUploaded(uploadedUrls)
  }

  function getUploadLabel() {
    if (imgData.imgUrls.length > 0) return 'Upload More?'
    return isUploading ? 'Uploading....' : 'Upload Image(s)'
  }

  return (
    <div className='upload-preview'>
      <label className='img-label' htmlFor='imgUpload'>
        {getUploadLabel()}
      </label>
      <input type='file' onChange={uploadImg} accept='image/*' id='imgUpload' multiple />
    </div>
  )
}
