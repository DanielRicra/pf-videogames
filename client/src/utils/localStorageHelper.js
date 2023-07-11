export const getCartItemsFromStorage = () => {
  const rawValue = localStorage.getItem('shopping-cart')
  if (rawValue) {
    try {
      const saved = JSON.parse(rawValue)
      return saved
    } catch (error) {
      throw new Error('Error parsing saved cart')
    }
  }
  return []
}
