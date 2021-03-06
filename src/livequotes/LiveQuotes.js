import React, { Component } from "react";

import "./LiveQuotes.css";

// import { Loading } from './theme-sources/bootstrap4/components/loading';

import { liveQuotesStore } from "./LiveQuotesStore"


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e) {
        this.props.onInStockChange(e.target.checked);
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.mayorsOnly}
                        onChange={this.handleInStockChange}
                    />
                    {' '}
                    Only show mayors
        </p>
            </form>
        );
    }
}

/*
class CellInput extends React.PureComponent {

    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this, this.props.fieldName);
    }

    handleTextChange(fldName, e) {
        this.props.onTextChange(fldName, e.target.value);
    }

    render() {
        const symbol = this.props.symbol;
        const value = symbol[this.props.fieldName];
        if (this.props.inEdit) {
            return (
                <input
                    type="text"
                    placeholder="..."
                    value={value}
                    onChange={this.handleTextChange}
                />)
        }

        return (
            <span>{value}</span>
        );
    }
}
*/

class SymbolRow extends React.PureComponent {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
        //this.handleEdit = this.handleEdit.bind(this);
        //this.handleCancel = this.handleCancel.bind(this);
        this.state = {
            symbol: this.props.symbol,
            symbolClone: null,
            inEdit: false
        }
        this.timeoutId = null;
    }


    componentDidMount() {
        const { symbol } = this.state;
        liveQuotesStore.subscribeToSymbol(symbol.symbolId, obj => {
            clearTimeout(this.timeoutId)
            this.setState({
                symbol: { ...symbol, ...obj }
            });
        });
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        // TODO unsubscribe
    }

    handleTextChange(fldName, value) {
        const symbol = Object.assign({}, this.state.symbol);
        symbol[fldName] = value;
        this.setState({ symbol: symbol });
    }

    /*
    handleEdit(e) {
        if (!this.state.inEdit) {
            //this.state.symbolClone = $.extend(true, {}, this.state.symbol);
            this.state.symbolClone = Object.assign({}, this.state.symbol);
        }
        this.setState(prevState => ({
            inEdit: !prevState.inEdit
        }));
    }

    handleCancel(value) {
        this.setState(prevState => ({
            //symbol: { price : prevState.price },
            //symbol : $.extend(true, {}, this.state.symbolClone),
            symbol: Object.assign({}, this.state.symbolClone),
            inEdit: !prevState.inEdit
        }));
    }
    */

    hideArrow() {
        //console.log(`hideArrow ${this.state.symbol.name}`)
        //console.log(this.state.symbol)
        const date = new Date();
        //console.log(sym)

        this.setState({
            symbol: { ...this.state.symbol, bidUp: null, askUp: null, epoch: date.getTime(), strEpoch: date.toLocaleTimeString() }
        })
        this.timeoutId = null;
        //console.log(this.state.symbol)
    }

    render() {
        const { symbol } = this.state;
        const name = symbol.group !== "mayor" ?
            symbol.name :
            <span style={{ color: 'gold' }}>
                {symbol.name}
            </span>;
        const bidParts = symbol.bidParts;
        const bidUp = symbol.bidUp;
        const askParts = symbol.askParts;
        const askUp = symbol.askUp;

        //if (this.timeoutId != null)
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(this.hideArrow.bind(this), 2000);

        return (

            <tr>
                <td>{name}</td>
                
                <td>{symbol.strEpoch}</td>
            </tr>

        );
    }
}



class SymbolTable extends React.PureComponent {
    render() {
        const filterText = this.props.filterText;
        const mayorsOnly = this.props.mayorsOnly;

        const rows = [];
        //let lastGroup = null;

        this.props.symbolRows.forEach((symbol) => {
            const filter = filterText.toUpperCase();
            if (symbol.name.indexOf(filter) === -1) {
                return;
            }
            if (mayorsOnly && symbol.group !== "mayor") {
                return;
            }
            rows.push(
                <SymbolRow
                    symbol={symbol}
                    key={symbol.name}
                />
            );
            //lastGroup = symbol.group;
        });

        return (
            <table className='table table-striped table-bordered table-hover table-sm table-dark my-table '>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th style={{textAlign:"right"}}>Bid</th>
                        <th></th>
                        <th style={{textAlign:"right"}}>Ask</th>
                        <th></th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}




class LiveQuotes extends Component {

  constructor(props) {
    super(props);

    this.state = {
        filterText: '',
        mayorsOnly: false,
        symbolRows: [],
        loading: true
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
    this.intervalId = null;
  }

  handleFilterTextChange(filterText) {
      this.setState({
          filterText: filterText
      });
  }

  handleInStockChange(mayorsOnly) {
      this.setState({
          mayorsOnly: mayorsOnly
      })
  }

  componentDidMount() {
      this.loadData();
  }

  componentDidUpdate() {
      //this.loadData();
  }

  componentWillUnmount() {
      clearInterval(this.intervalId);
  }

  //play() {
  //}

  loadData() {
    liveQuotesStore.getSnapshot(null)
          .then(symbolRows => {
              this.setState({
                  symbolRows: [...symbolRows],
                  loading: false
              });
              //this.intervalId = setInterval(this.play.bind(this), 1000);
          })
          .catch(reason => console.log('Handle rejected liveQuotesStore.subscribe promise:' + reason))
  }

  render() {
      return (
          <div className="LiveQuotes">
              
              <SearchBar
                  filterText={this.state.filterText}
                  mayorsOnly={this.state.mayorsOnly}
                  onFilterTextChange={this.handleFilterTextChange}
                  onInStockChange={this.handleInStockChange}
              />

              <SymbolTable
                  symbolRows={this.state.symbolRows}
                  filterText={this.state.filterText}
                  mayorsOnly={this.state.mayorsOnly}
              />

          </div>
      );
  }


}

export default LiveQuotes;
