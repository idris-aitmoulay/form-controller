export interface ValidationError {
  message: string;
  field: string;
  type: string;
}

export interface InputChangeEvent {
  name: string;
  value: string;
  errors: ValidationError[];
}
