import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded = null,useCustomSVG = false }) {
  const [imgData, setImgData] = useState({
    imgUrls: [], // Store multiple image URLs in an array.
  })
  const [isUploading, setIsUploading] = useState(false)
  const customSVG = (
    <svg  width="40" height="40" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 5.8182C6.29294 5.8182 4.90909 7.20205 4.90909 8.90911C4.90909 10.6162 6.29294 12 8 12C9.70706 12 11.0909 10.6162 11.0909 8.90911C11.0909 7.20205 9.70706 5.8182 8 5.8182Z"></path><path fillRule="evenodd" clipRule="evenodd" d="M1.45455 15.2727C1.06878 15.2727 0.698807 15.1195 0.426027 14.8467C0.153246 14.5739 0 14.204 0 13.8182V4.36366C0 3.97789 0.153246 3.60792 0.426027 3.33514C0.698807 3.06236 1.06878 2.90911 1.45455 2.90911H4.36364L5.81818 0.727295H10.1818L11.6364 2.90911H14.5455C14.9312 2.90911 15.3012 3.06236 15.574 3.33514C15.8468 3.60792 16 3.97789 16 4.36366V13.8182C16 14.204 15.8468 14.5739 15.574 14.8467C15.3012 15.1195 14.9312 15.2727 14.5455 15.2727H1.45455ZM3.81818 8.90911C3.81818 6.59956 5.69045 4.72729 8 4.72729C10.3096 4.72729 12.1818 6.59956 12.1818 8.90911C12.1818 11.2187 10.3096 13.0909 8 13.0909C5.69045 13.0909 3.81818 11.2187 3.81818 8.90911ZM2.90909 5.09093C2.90909 5.49259 2.58348 5.8182 2.18182 5.8182C1.78016 5.8182 1.45455 5.49259 1.45455 5.09093C1.45455 4.68927 1.78016 4.36366 2.18182 4.36366C2.58348 4.36366 2.90909 4.68927 2.90909 5.09093Z"></path></svg>

  )

  async function uploadImg(ev) {
    setIsUploading(true)

    const uploadedUrls = await uploadService.uploadImages(ev)
    setImgData({ imgUrls: uploadedUrls })
    setIsUploading(false)

    onUploaded && onUploaded(uploadedUrls)
  }

  function getUploadLabel() {
    if (imgData.imgUrls.length > 0) return 'Upload More?'
    return isUploading ? 'Uploading....' : (useCustomSVG ? customSVG : 'Upload Image(s)'); 
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
