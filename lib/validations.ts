export const required = (message?: string) => {
  return {
    required: {
      value: true,
      message: message ?? "Este campo es requerido",
    }
  }
}

export const minLength = (min: number, message?: string) => {
  return {
    minLength: {
      value: min,
      message: message ?? `Este campo debe tener al menos ${min} caracteres`,
    }
  }
}

export const maxLength = (max: number, message?: string) => {
  return {
    maxLength: {
      value: max,
      message: message ?? `Este campo debe tener máximo ${max} caracteres`,
    }
  }
}

export const email = (message?: string) => {
  return {
    pattern: {
      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: message ?? "Correo inválido",
    },
  }
}

export const onlyNumbers = (message?: string) => {
  return {
    pattern: {
      value: /^[0-9]*$/,
      message: message ?? "Solo números",
    },
  }
}