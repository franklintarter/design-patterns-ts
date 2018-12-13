// Why?
// Want to add operations to an elements of similar category, without changing the elements themselves

interface IAssetVisitor {
  visitStock(subject: Stock): void
  visitRealEstate(subject: RealEstate): void
}

interface IAsset {
  receive(assetVisitor: IAssetVisitor)
}

class AssetLogger implements IAssetVisitor {

  visitStock(stock: Stock) {
    console.log(`
      Ticker: ${stock.ticker}
      Quantity: ${stock.quantity}
      Last: ${stock.last}
      Total Value: ${stock.quantity * stock.last}
    `)
  }

  visitRealEstate(realEstate: RealEstate) {
    console.log(`
      Address: ${realEstate.address}
      Value: ${realEstate.appraisedValue}
    `)
  }
}

class Stock implements IAsset {
  constructor(
    public last: number,
    public quantity: number,
    public ticker: String
  ) {}

  receive(assetVisitor: IAssetVisitor): void {
    assetVisitor.visitStock(this);
  }
}

class RealEstate implements IAsset {
  constructor(public appraisedValue: number, public address: String) {}

  receive(assetVisitor: IAssetVisitor): void {
    assetVisitor.visitRealEstate(this);
  }
}

const triplex = new RealEstate(350000, '1234 NoWheresVille')
const AAPL = new Stock(138.28, 2000, 'AAPL')

triplex.receive(new AssetLogger())
AAPL.receive(new AssetLogger())
