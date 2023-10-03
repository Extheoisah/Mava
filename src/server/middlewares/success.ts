interface CustomSuccess {
  status: number
  message: string
  data?: any
}

class CreateCustomSuccess {
  data?: any
  message: string
  status: number

  constructor(message: string, status: number, data?: any) {
    this.message = message
    this.status = status
    this.data = data
  }
}

export { CreateCustomSuccess, CustomSuccess }
