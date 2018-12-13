// Why? expose REACTIVE objects or properties

interface IObserver<T> {
  onNotify(subject: T)
}

class Observable<T> {
  constructor() {
    this.observers = []
  }

  private observers: IObserver<T>[]

  register(observer: IObserver<T>): void {
    this.observers.push(observer)
  }

  unRegister(observer: IObserver<T>): void {
    this.observers.filter(x => x !== observer)
  }

  notify(subject: T): void {
    this.observers.forEach(x => x.onNotify(subject))
  }
}

class Oxymeter extends Observable<Number> {
  public lastReading: Number
  public updateReading(reading): void {
    this.lastReading = reading
    this.notify(this.lastReading)
  }
}

class OxymiterScreen implements IObserver<Number> {
  onNotify(subject: Number) {
    console.log(`draw screen ${subject}`)
  }
}

class OxymeterBeeper implements IObserver<Number> {
  onNotify(subject: Number) {
    if (subject > 90) {
      console.log('beep')
    } else {
      console.log('oh shit')
    }
  }
}

const oxymeter = new Oxymeter()
const monitor = new OxymiterScreen()
const beeper = new OxymeterBeeper()

oxymeter.register(monitor)
oxymeter.register(beeper)

oxymeter.updateReading(98)
oxymeter.updateReading(68)
