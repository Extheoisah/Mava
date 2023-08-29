type ErrorLevel =
  (typeof import("./errors").ErrorLevel)[keyof typeof import("./errors").ErrorLevel]
type ValidationError = import("./errors").ValidationError
type BigIntConversionError = import("./errors").BigIntConversionError
