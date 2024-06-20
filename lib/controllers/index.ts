import RadioController from "./RadioController";
import TextInputController from "./TextInputController";
import NumberInputController from "./NumberInputController";
import Controller from "./Controller";

const fields: Record<string, typeof Controller> = {
  radio: RadioController,
  text: TextInputController,
  number: NumberInputController,
}

export default fields;
