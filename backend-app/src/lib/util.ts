import { MonthEnum } from '@/models/payment.model'

class UtilsFunctions {
  static areNumbersSecuentials (secuentialNumbers: number[]) {
    let validator = true
    if (secuentialNumbers.length === 1) {
      return validator
    }
    for (let index = 0; index < secuentialNumbers.length; index++) {
      // check if is the first number
      if (index === 0) {
        if ((secuentialNumbers[index] + 1) !== secuentialNumbers[index + 1]) {
          validator = false
          return validator
        }
      // check if is last of array
      } else if (index === secuentialNumbers.length - 1) {
        if ((secuentialNumbers[index] - 1) !== secuentialNumbers[index - 1]) {
          validator = false
          return validator
        }
      } else {
        if ((secuentialNumbers[index] - 1) !== secuentialNumbers[index - 1] || (secuentialNumbers[index] + 1) !== secuentialNumbers[index + 1]) {
          validator = false
          return validator
        }
      }
    }
    return validator
  }

  static generateCode (value: string) {
    return value.toLowerCase().trim().replace(/ /g, '-')
  }

  static getMonthWithNumber (number: number) {
    switch (number) {
      case 0:
        return MonthEnum.ENERO
      case 1:
        return MonthEnum.FEBRERO
      case 2:
        return MonthEnum.MARZO
      case 3:
        return MonthEnum.ABRIL
      case 4:
        return MonthEnum.MAYO
      case 5:
        return MonthEnum.JUNIO
      case 6:
        return MonthEnum.JULIO
      case 7:
        return MonthEnum.AGOSTO
      case 8:
        return MonthEnum.SEPTIEMBRE
      case 9:
        return MonthEnum.OCTUBRE
      case 10:
        return MonthEnum.NOVIEMBRE
      case 11:
        return MonthEnum.DICIEMBRE
      default:
        return MonthEnum.DICIEMBRE
    }
  }
}

export default UtilsFunctions
