interface Command {
  execute(): void;
}

class SimpleCommand implements Command {
  constructor(private payload: string){ }

  public execute(): void {
    console.log(`SimpleCommand.execute(), payload: ${this.payload}`);
  }
}

class ComplexCommand implements Command {
  constructor(
    private receiver: Receiver,
    private a: string,
    private b: string
  ) {}

  public execute(): void {
    console.log('ComplexCommand.execute()');
    receiver.doSomething1(this.a)
    receiver.doSomething2(this.a)
  }
}

class Receiver {
  public doSomething1(a: string): void {
    console.log(`Recevier.doSomething1(${a})`)
  }
  public doSomething2(b: string): void {
    console.log(`Recevier.doSomething2(${b})`)
  }
}

class Invoker {
  private onStart: Command;
  private onFinish: Command;

  public setOnStart(command: Command): void {
    this.onStart = command;
  }
  public setOnFinish(command: Command): void {
    this.onFinish = command;
  }

  public doSomethingImportant(): void {
    console.log('Invoker: 시작')
    if(this.isCommand(this.onStart)) {
      this.onStart.execute();
    }

    console.log('Invoker: 중간')
    if(this.isCommand(this.onFinish)) {
      this.onFinish.execute();
    }
  }

  private isCommand(object): object is Command {
    return object.execute !== undefined;
  }
}

const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand('Say Hi!'));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));

invoker.doSomethingImportant();