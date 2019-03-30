import React, { Component } from 'react'
import SheetCard from './SheetCard'
import CardDeck from 'react-bootstrap/CardDeck'
export default class SheetCards extends Component {
  render() {
    return (
      <div>
      <CardDeck className="mb-sm-4 mr">
        <SheetCard />
        <SheetCard />
        <SheetCard />
        <SheetCard />
      </CardDeck>
       <CardDeck>
            <SheetCard />
            <SheetCard />
            <SheetCard />
            <SheetCard />
       </CardDeck>
          </div>
    )
  }
}
