export interface CustomError {
  name: string
  message: string
  status: number
}

const createCustomError = (
  message: string,
  status: number,
  name?: string,
): CustomError => ({
  name: name || "CustomError",
  message,
  status,
})

const NotFoundError = (path?: string) =>
  createCustomError(`Resource not found at ${path}`, 404, "NotFoundError")
const InternalServerError = () => {
  const { message, status, name } = createCustomError(
    "An error occurred, please try again later",
    500,
    "InternalServerError",
  )
  return { message, status, name }
}

export { NotFoundError, InternalServerError }
