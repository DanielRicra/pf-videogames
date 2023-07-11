export const getCardShowAmount = (screenWidth) => {
  if (screenWidth < 640) {
    return 1
  } else if (screenWidth < 768) {
    return 2
  } else if (screenWidth < 1024) {
    return 3
  } else if (screenWidth < 1280) {
    return 4
  }
  return 5
}

export const convertImageFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
