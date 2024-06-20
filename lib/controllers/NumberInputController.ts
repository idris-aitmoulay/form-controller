import AbstractTextInputController from "./AbstractTextInputController";
import { ValidationError } from "./utils";

class NumberInputController extends AbstractTextInputController {
  validate(value: string): ValidationError[] {
    if (this.required && value === '') {
      return [
        {
          field: this.name,
          type: 'required',
          message: `${this.name} should not be empty and a real number`
        }
      ];
    }
    const errors: ValidationError[] = [];
    const valueToValidate = +value;
    if (this.min && valueToValidate < this.min) {
        errors.push({
          field: this.name,
          type: 'min',
          message: `${this.name} is less than ${this.min}`
        })
    }

    if (this.max && valueToValidate > this.max) {
      errors.push({
        field: this.name,
        type: 'max',
        message: `${this.name} is greater than ${this.max}`
      })
    }

    return errors;
  }
}

export default NumberInputController;
