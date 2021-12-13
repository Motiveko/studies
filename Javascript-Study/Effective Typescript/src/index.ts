declare let hasDates: boolean;
const nameTitle = {name: 'motkeko', title: 'feDev' };
const motiveko = {
  ...nameTitle,
  ...(hasDates ? {start: 1991, end: 2099} : {})
}