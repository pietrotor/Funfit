import React from 'react'

export const onImagePreviewError = (
  e: React.ChangeEvent<HTMLImageElement>,
  customImage?: string
) => {
  e.currentTarget.onerror = null
  return `${customImage || '/common/missing_image.png'}`
  // e.currentTarget.src = `${customImage || '/common/missing_image.png'}`
  // e.currentTarget.srcset = `${customImage || '/common/missing_image.png'}`
}
