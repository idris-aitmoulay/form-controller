import AbstractTextInputController from "./AbstractTextInputController";
import {ValidationError} from "./utils";

class TextInputController extends AbstractTextInputController {

  validate(value: string): ValidationError[] {
    const errors: ValidationError[] = [];
    if (this.required && (value === undefined || value === null)) {
      errors.push({
        field: this.name,
        type: 'required',
        message: `${this.name} is required`
      })
      return errors;
    }

    if (this.min && value.length < this.min) {
      errors.push({
        field: this.name,
        type: 'min',
        message: `${this.name} length is less than ${this.min}`
      })
    }

    if (this.max && value.length > this.max) {
      errors.push({
        field: this.name,
        type: 'max',
        message: `${this.name} length is greater than ${this.max}`
      })
    }

    return errors;
  }
}

export default TextInputController;
