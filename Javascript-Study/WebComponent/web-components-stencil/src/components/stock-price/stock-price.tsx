import { Component, Element, h, Prop, State } from '@stencil/core';
import { catchError, debounceTime, from, map, Subject, switchMap, tap } from 'rxjs'
@Component({
  tag: 'uc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true,
})
export class StockPrice {

  stokcInput: HTMLInputElement

  @Element() el: HTMLElement;

  @State() fetchedPrice: number = 0;

  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;

  @Prop() stockSymbol: string

  subject = new Subject<string>();
  constructor() {
    this.subject
      .pipe(
        debounceTime(300),
        switchMap(
          (symbol) => from(fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=YNJ8L0Q71SR4FY13`)
            .then(res => res.json()))
        ),
        tap(res => {
          if(!res['Global Quote']['05. price']) {
            throw new Error('Invalid Symbol');
          }
          this.fetchedPrice = res['Global Quote']['05. price']
        }),
        catchError(err => this.error = err.message)
      )
      .subscribe()
  }

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    this.stockInputValid = this.stockUserInput.trim() !== '';
    if(this.stockInputValid) this.subject.next(this.stockUserInput);
  }
  // API key: YNJ8L0Q71SR4FY13
  getPrice() {
    // const symbol = (event.target as HTMLInputElement).value || 'MSFT';
    // const symbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    // const symbol = this.stokcInput.value;
  }
  componentDidLoad() {
    console.log(this.stockSymbol)
    if( this.stockSymbol) {
      this.subject.next(this.stockSymbol);
    }
  }
  
  onFetchStockPrice() {
    this.subject.next('');
  }

  render() {
    
    const dataContent = this.error
    ? <p>{this.error}</p>
    : this.fetchedPrice
      ? <div>Price: $ {this.fetchedPrice}</div>
      : <p>Please eneter a symbol</p>

    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        {/* <input type="text" id="stock-symbol" onChange={this.getPrice.bind(this)}/> */}
        <input type="text" id="stock-symbol" 
          ref={el => this.stokcInput = el }
          value={this.stockUserInput}
          onInput={this.onUserInput.bind(this)}
        />
        <button type="submit" disabled={!this.stockInputValid}>Fetch</button>
      </form>,
      <div>{ dataContent }</div>
    ]
  }
}
