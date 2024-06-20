import Controller from "./Controller";

class RadioController extends Controller {
  getEventType(): "input"   | "change" {
    return 'change';
  }
}

export default RadioController;
