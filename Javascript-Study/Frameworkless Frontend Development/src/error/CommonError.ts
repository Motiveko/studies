export class CommonError implements Error {
  name: string = 'CommonError';
  message: string;
  stack?: string | undefined;
  constructor(message: string = '처리중 오류가 발생했습니다.') {
    this.message = message
  }
}