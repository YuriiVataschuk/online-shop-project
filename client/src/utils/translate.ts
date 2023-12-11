export const translateContent = (
  enValue: string,
  uaValue: string,
  lang: string
) => {
  const isEng = lang === 'EN'
  return isEng ? enValue : uaValue
}
