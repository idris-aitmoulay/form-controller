import Controller from "./Controller";

class AbstractTextInputController extends Controller {
  min?: number;
  max?: number;
  constructor(config: HTMLInputElement) {
    super(config);
    const {min, max} = config;
    if (min) {
      this.min = +min
    }

    if (max) {
      this.max = +max
    }
  }

  getEventType(): "input"   | "change" {
    return 'input';
  }

}

export default AbstractTextInputController;
