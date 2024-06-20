import {useCallback, useEffect, useRef, useState} from "react";
import Controller from "./controllers/Controller";
import fields from "./controllers";
const CONTROLLED_FIELD = ['text', 'radio', 'number'];

function getControlledElements(elements: HTMLFormControlsCollection): HTMLInputElement[] {
  return Object.values(elements)
    .filter(field => field instanceof HTMLInputElement)
    .map(field => field as HTMLInputElement);
}

function useFormControl() {
  const fieldsController = useRef<Record<string, Controller>>({});
  const formRef = useRef<Record<string, HTMLElement | null>>({});
  const [errorsMessage, setErrorsMessage] = useState({});

  const updateErrorMessage =  useCallback(() => {
    setErrorsMessage(prev => {
      console.warn(prev)
      return prev
    })
  }, [])

  useEffect(() => {
    console.warn('mounted error hooks');
    return () => {
      console.warn('unmounted error hooks');
    }
  }, [updateErrorMessage])

  useEffect(() => {
    return () => {
      const { current: controllers } = fieldsController;
      for (const controllerKey in controllers) {
        const controller = controllers[controllerKey];
        if (controller.hasEventListener()) {
          controller.unregisterEventListener();
        }
      }
    }
  }, [])

  const registerForm = useCallback((form: HTMLFormElement | null) => {
    if (!form) return;
    formRef.current = { form };
    function registerEvent(dt: any) {
      console.warn('useFormControl', dt)
    }

    const elements = (form?.elements || {}) as HTMLFormControlsCollection;
    const inputElements: HTMLInputElement[] = getControlledElements(elements);
    for (const element of inputElements) {
      const type: string = element?.type || '';
      const name: string = element?.name || '';
      const isElementExist = !fieldsController.current[name];
      if (isElementExist && name && CONTROLLED_FIELD.includes(type)) {
        const Class: typeof Controller = fields[type];
        fieldsController.current[name] = new Class(element);
        fieldsController.current[name].registerEventListener();
        fieldsController.current[name].on('change', registerEvent)
      }
    }

    return () => {
      const fields = fieldsController.current;
      for(const index in fields) {
        const field = fields[index];
        if (field.hasEventListener()) {
          field.off('change', registerEvent)
        }
      }
    }

  }, [])
  return {
    registerForm,
    errorsMessage
  }
}

export default useFormControl;
