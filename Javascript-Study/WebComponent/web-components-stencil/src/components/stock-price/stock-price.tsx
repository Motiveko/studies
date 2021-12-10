import { Component, Element, h, Listen, Prop, State, Watch } from '@stencil/core';
import { catchError, debounceTime, delay, distinctUntilChanged, from, Subject, switchMap, tap } from 'rxjs'
@Component({
  tag: 'uc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true,
})
export class StockPrice {

  stokcInput: HTMLInputElement | undefined

  @Element() el!: HTMLElement;

  @State() fetchedPrice: number = 0;

  @State() stockUserInput!: string;
  @State() stockInputValid = true;
  @State() error!: string;
  @State() isLoading = true;

  @Prop({mutable: true, reflect: true}) stockSymbol!: string
  
  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string) {
    console.log('stockSymbolChanged');
    this.stockInputValid = this.stockUserInput.trim() !== '';
    this.stockUserInput = newValue;
    this.subject.next(newValue);
  }

  subject = new Subject<string>();
  constructor() {
  
    this.subject
      .pipe(
        distinctUntilChanged((prev, curr) => prev===curr),
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(
          (symbol) => from(fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=YNJ8L0Q71SR4FY13`)
            .then(res => res.json()))
        ),
        delay(1600),
        tap(res => {
          if(!res['Global Quote']['05. price']) {
            throw new Error('Invalid Symbol');
          } 
          this.fetchedPrice = res['Global Quote']['05. price']
          this.error = null;
          this.isLoading = false;
        }),
        catchError(err => {
          this.error = err.message
          this.isLoading = false;
          return '';
        })
      )
      .subscribe()
  }

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    this.stockInputValid = this.stockUserInput.trim() !== '';
    if(this.stockInputValid) this.subject.next(this.stockUserInput);
  }

  @Listen('ucSymbolSelected', {target: 'body'})
  onStockSymbolSelected(event: CustomEvent) {
    console.log('onStockSymbolSelected')
    console.log(event);
    if(event.detail && event.detail !== this.stockUserInput) {
      this.stockUserInput = event.detail;
      this.stockSymbol = this.stockUserInput
      this.subject.next(event.detail);
    }
  }

  hostData() {
    return { class: this.error ? 'error' : '' }
  }

  componentWillLoad() {
    console.log('componentWillLoad')
    this.stockUserInput = this.stockSymbol
    console.log(this.stockSymbol)
  }

  componentWillUpdate() {
    console.log('componentWillUpdate')
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  componentDidLoad() {
    if( this.stockSymbol) {
      this.subject.next(this.stockSymbol);
    }
  }

  disconnectedCallback() {
    console.log('disconnectedCallback')
  }

  
  onFetchStockPrice(event: Event) {
    event.preventDefault();
    this.subject.next('');
  }

  render() {
    
    const dataContent = this.error
    ? <p>{this.error}</p>
    : this.isLoading
      ? <uc-spinner></uc-spinner>
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
        <button type="submit" disabled={!this.stockInputValid || this.isLoading}>Fetch</button>
      </form>,

      <div>{ dataContent }</div>
      // <div class="lds-ripple"><div></div></div>
    ]
  }
}
