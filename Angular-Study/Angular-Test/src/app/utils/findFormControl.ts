import { AbstractControl, ControlContainer } from '@angular/forms';

export const findFormControl = (
  control?: AbstractControl,
  controlName?: string,
  controlContainer?: ControlContainer
): AbstractControl => {
  if (control) {
    return control;
  }
  if (!controlName) {
    throw new Error('controlName은 필수값입니다.');
  }
  if (!(controlContainer && controlContainer.control)) {
    throw new Error('부모 Form Control에 대한 참조를 찾을 수 없습니다.');
  }
  const controlFromName = controlContainer.control.get(controlName);
  if (!controlFromName) {
    throw new Error(
      `부모 Form Control에서 ${controlName} 요소를 찾을 수 없습니다.`
    );
  }
  return controlFromName;
};
