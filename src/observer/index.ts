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

class Oximeter extends Observable<Number> {
  public lastReading: Number
  public updateReading(reading): void {
    this.lastReading = reading
    this.notify(this.lastReading)
  }
}

class OximiterScreen implements IObserver<Number> {
  onNotify(subject: Number) {
    console.log(`draw screen ${subject}`)
  }
}

class OximeterBeeper implements IObserver<Number> {
  onNotify(subject: Number) {
    if (subject > 90) {
      console.log('beep')
    } else {
      console.log('oh shit')
    }
  }
}

const oximeter = new Oximeter()
const monitor = new OximiterScreen()
const beeper = new OximeterBeeper()

oximeter.register(monitor)
oximeter.register(beeper)

oximeter.updateReading(98)
oximeter.updateReading(68)
