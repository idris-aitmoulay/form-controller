import { EventEmitter } from 'events';
import { ValidationError } from "./utils";

class Controller extends EventEmitter {
  rawConfig: HTMLInputElement;
  required: boolean;
  disabled: boolean;
  name: string;
  eventListenerLoaded: boolean;
  errors: any[]  = [];

  constructor(config: HTMLInputElement) {
    super();
    this.rawConfig = config;
    this.disabled = config.disabled;
    this.required = config.required;
    this.name = config.name;
    this.eventListenerLoaded = false;
  }
  getEventType(): 'input' | 'change' {
    throw new Error("getEventType not implemented")
  }

  registerEventListener() {
    const eventType = this.getEventType();
    this.rawConfig.addEventListener(eventType, this.onStateUpdate.bind(this));
    this.eventListenerLoaded = true;
  }

  onStateUpdate($event: any) {
    const currentValue = $event.target.value;
    this.errors = this.validate(currentValue);
    return this.handleChange(currentValue, this.errors)
  }

  validate(_: any): ValidationError[] {
    return [];
  }

  handleChange(value: any, errors?:ValidationError[]) {
    this.emit('change', { name: this.name, value, errors });
  }

  unregisterEventListener() {
    const eventType = this.getEventType();
    this.rawConfig.removeEventListener(eventType, this.handleChange.bind(this))
    this.eventListenerLoaded = false;
  }

  hasEventListener(): boolean {
    return this.eventListenerLoaded;
  }
}

export default Controller;
