export const loocalStorage = (key: string, initialValue: any) => {
  const getValues = () => {
    const storage = localStorage.getItem(key)

    if (!storage) {
      localStorage.setItem(key, JSON.stringify(initialValue))

      return initialValue
    }

    return JSON.parse(storage)
  }

  const value = getValues()

  const setValue = (newValue: any[] | any) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return { value, setValue }
}
