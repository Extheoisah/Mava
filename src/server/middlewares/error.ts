export interface CustomError {
  name: string
  message: string
  status: number
}

class CreateCustomError {
  name: string
  message: string
  status: number

  constructor(message: string, status: number, name: string = "CustomError") {
    this.name = name
    this.message = message
    this.status = status
  }
}

class NotFoundError extends CreateCustomError {
  constructor(path?: string) {
    super(`Resource not found at ${path || "unknown"}`, 404, "NotFoundError")
  }
}

class InternalServerError extends CreateCustomError {
  constructor() {
    super("An error occurred, please try again later", 500, "InternalServerError")
  }
}

export { NotFoundError, InternalServerError }
