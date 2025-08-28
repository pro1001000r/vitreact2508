// Получаем контрольный символ EAN13
export const EAN13Control = (strText: string) => {
  // EAN-13
  var intSumOdd = 0,
    intSumEven = 0,
    intCheck,
    i;

  // Compute check digit and add it to raw string
  for (i = 0; i < 12; i += 2) {
    intSumEven += parseInt(strText[i]);
    intSumOdd += parseInt(strText[i + 1]);
  }
  intCheck = (intSumOdd * 3 + intSumEven) % 10;
  if (intCheck > 0) {
    intCheck = 10 - intCheck;
  }
  strText += String(intCheck);
  return { control: String(intCheck), barcode: strText };
}; // End EAN-13

//Проверяем что это EAN13
export const isEAN13 = (strText: string) => {
  if (strText.length !== 13) {
    return false;
  }

  let { control } = EAN13Control(strText);

  if (strText[12] == control) {
    return true;
  } else {
    return false;
  }
};
