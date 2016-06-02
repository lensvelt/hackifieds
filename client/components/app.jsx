import Nav from './nav.jsx';
import Filter from './filter.jsx';
import Listings from './listings.jsx';
import ListingInfo from './listingInfo.jsx';
import helpers from '../lib/helpers.js';

class App extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      listings: [],
      navCategory: 'Rent',  //Default listings category to show
      activeFilter: 'All',  //Default filter to show All
      activeListing: null   //Default to not show Listing Info component
    };
  }

  componentWillMount () {
    this.retrieveListings(this.state.navCategory);
  }

  retrieveListings (category) {
    helpers.getListings( category, data => {
      this.setState( {
        listings: data
      })
    });
  }

  sendListing () {
    helpers.postListing(this.state.navCategory);
    this.retrieveListings(this.state.navCategory);
  }

  handleNavClick(value) {
    this.setState({
      navCategory: value
    });
    this.retrieveListings(value);
  }

  handleFilterItemClick(event) {
    //Set the current activeFilter value
    this.setState({
      activeFilter: event.currentTarget.id
    });
  }
  
  handleListingEntryClick(event) {
    //Set the current activeListing
    this.setState({
      activeListing: Number(event.currentTarget.id)
    });
  }

  handleListingInfoClick(event) {
    //Set the current activeListing to null / close the Listing Info component
    this.setState({
      activeListing: null
    });
  }

  render () {
    return (
      <div className='app'>
        <Nav handleNavClick={this.handleNavClick.bind(this)}/>
        <Listings handleListingEntryClick={this.handleListingEntryClick.bind(this)} 
                  handleListingInfoClick={this.handleListingInfoClick.bind(this)}
                  activeFilter={this.state.activeFilter}
                  activeListing={this.state.activeListing}
                  listings={this.state.listings}/>
        <Filter handleFilterItemClick={this.handleFilterItemClick.bind(this)} listings={this.state.listings}/>
        <button id="getButton" type="button" onClick={this.retrieveListings.bind(this)}>GET</button>
        <button id="postButton" type="button" onClick={this.sendListing.bind(this)}>POST</button>
      </div>
    );
  }

}

export default App;

