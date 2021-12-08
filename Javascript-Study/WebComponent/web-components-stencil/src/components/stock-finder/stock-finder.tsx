import { Component, Event, EventEmitter, h, State } from "@stencil/core";

@Component({
    tag: 'uc-stock-finder',
    styleUrl: './stock-finder.css',
    shadow: true
})
export class StockFinder {
  stockNameInput: HTMLInputElement

  @State() searchResults: {symbol: string, name: string}[];

  @Event({bubbles: true, composed: true,}) ucSymbolSelected: EventEmitter<string>;

  onFindStocks(event: Event) {
    event.preventDefault();
    const stockName = this.stockNameInput.value;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=YNJ8L0Q71SR4FY13`)
      .then(response => response.json())
      .then((parsedRes) => {
        this.searchResults = parsedRes['bestMatches'].map((match) => ({ symbol: match['1. symbol'], name: match['2. name']}));
        console.log(this.searchResults)
      })
      .catch(console.error)
  }

  onSelectSymbol(symbol: string) {
    this.ucSymbolSelected.emit(symbol)
  }

  render() {
    console.log('redner');
    return [
    <form onSubmit={this.onFindStocks.bind(this)}>
      <input type="text" id="stock-symbol" 
        ref={el => this.stockNameInput = el }
      />
      <button type="submit" >Find!</button>
    </form>,
    <ul>
      {this.searchResults?.map(result => (
        <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>{result.name}</li>
      ))}
    </ul>
    ]
  }
}