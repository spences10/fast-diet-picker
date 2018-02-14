import React from 'react'
import styled from 'styled-components'

// import Button from './Button'
import Quote from './Quote'
import Notice from './Notice'

// import Tickers from './Tickers'
import Cryptocurrency from './Cryptocurrency'

import { fetchCryptocurrencyData } from '../util/helpers'

const PageContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    '. . h h h h h h h h . .'
    '. . c c c c c c c c . .'
    '. . f f f f f f f f . .';
`

const CryptoWrapper = styled.div`
  display: grid;
  grid-area: c;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
`

class App extends React.Component {
  constructor() {
    super()

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this)

    this.state = {
      data: []
    }
  }

  handleCurrencyChange(e) {
    const url = this.apiUrl(e.target.value)
    fetchCryptocurrencyData(url).then(result => {
      this.setState({ data: result.data })
    })
  }

  apiUrl() {
    if (arguments.length === 0 || !arguments[0]) {
      return 'https://api.coinmarketcap.com/v1/ticker/?convert=GBP&limit=50'
    }

    if (!arguments[1]) {
      return `https://api.coinmarketcap.com/v1/ticker/?convert=${
        arguments[0]
      }&limit=10`
    }

    return `https://api.coinmarketcap.com/v1/ticker/?convert=${
      arguments[0]
    }&limit=${arguments[1]}`
  }

  componentWillMount() {
    fetchCryptocurrencyData(this.apiUrl()).then(result => {
      this.setState({ data: result.data })
    })
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      console.log('start')
      fetchCryptocurrencyData(this.apiUrl()).then(result => {
        this.setState({ data: result.data })
      })
      console.log('end')
    }, 2 * 60 * 1000)
  }

  render() {
    return (
      <PageContainer>
        <Quote handleCurrencyChange={this.handleCurrencyChange}>
          Cryptocurrency tickers
        </Quote>
        <CryptoWrapper>
          {this.state.data.map((items, index) => {
            // console.log('====================')
            // console.log(items)
            // console.log('====================')
            return <Cryptocurrency key={index} {...items} />
          })}
        </CryptoWrapper>
        {/* <Tickers /> */}
        <Notice>
          Information updated every 5 minutes courtesy of
          coinmarketcap.com
        </Notice>
        {/* <Button>Hey, click me!</Button> */}
      </PageContainer>
    )
  }
}

export default App
