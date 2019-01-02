// Why? Allow clients to inject their own implementations
// Helps adhere to SRP, OCP, DIP

interface IDateFormatter {
  format(date: Date): string
}

class Logger {
  constructor(private formatter: IDateFormatter) {

  }

  public log(text: string): void {
    const formattedDate = this.formatter.format(new Date())
    // log(`${formattedDate}: ${text}`)
  }
}
