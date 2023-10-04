interface CustomSuccess {
  status: number
  message: string
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  data?: any
}

class CreateCustomSuccess {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  data?: any
  message: string
  status: number

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  constructor(message: string, status: number, data?: any) {
    this.message = message
    this.status = status
    this.data = data
  }
}

export { CreateCustomSuccess, CustomSuccess }
