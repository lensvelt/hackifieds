import Nav from './nav.jsx';
import Filter from './filter.jsx';
import Listings from './listings.jsx';
import ListingInfo from './listingInfo.jsx';
import NewListing from './newListing.jsx';
import helpers from '../lib/helpers.js';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      categories: [],
      // users: [],
      listings: [],
      navCategory: 'Rent',
      activeFilter: 'All',
      activeListing: null,
      currentUserId: null
    };
  }

  componentWillMount () {
    this.retrieveCategories();
    // this.retrieveUsers();
    this.retrieveListings(this.state.navCategory);
    // this.setCurrentUserByName('malaneti');
  }

  retrieveCategories () {
    helpers.getCategories( data => this.setState({categories: data}) );
  }

  // retrieveUsers () {
  //   helpers.getUsers( data => this.setState({users: data}) );
  // }

  // setCurrentUserByName (name) {
  //   helpers.getUsers( data => { this.setState({currentUser: data.filter(usr => usr.username === name)[0]}) });
  // }

  retrieveListings (category) {
    helpers.getListings( category, data => this.setState({listings: data}) );
  }

  sendListing (newListing) {
    helpers.postListing(newListing, data => {
      let newCategory = this.state.categories.filter(cat => cat.categoryId === newListing.categoryId);
      this.handleNavClick(newCategory[0].categoryName);
    });
  }

  handleNavClick (value) {
    this.setState({ navCategory: value, activeFilter: 'All' });
    this.retrieveListings(value);
  }

  handleFilterItemClick(event) {
    this.setState({ activeFilter: event.currentTarget.id });
  }

  handleListingEntryClick(event) {
    this.setState({ activeListing: Number(event.currentTarget.id) });
  }

  handleListingInfoClick(event) {
    this.setState({ activeListing: null });
  }

  loggedIn(user){
    console.log(user);
    if (user) {
      this.setState({
        user: user
      });
    }
  }

  render () {
    return (
      <div className='app'>
        <Nav handleNavClick={this.handleNavClick.bind(this)}/>
        <Grid>
          <Row className="show-grid">
            <Col xs={2} md={2} lg={2}>
              <Filter handleFilterItemClick={this.handleFilterItemClick.bind(this)}
                      listings={this.state.listings}/>
            </Col>
            <Col xs={10} md={10} lg={10}>
              <Listings handleListingEntryClick={this.handleListingEntryClick.bind(this)} 
                  handleListingInfoClick={this.handleListingInfoClick.bind(this)}
                  activeFilter={this.state.activeFilter}
                  activeListing={this.state.activeListing}
                  listings={this.state.listings}/>
            </Col>
          </Row>
        </Grid>
        <NewListing categories={this.state.categories}
                    navCategory={this.state.navCategory}
                    user={this.state.currentUserId}
                    clickHandler={this.sendListing.bind(this)}/>
        <button id="postButton" type="button" onClick={this.sendListing.bind(this)}>POST</button>
        <p>
          {this.state.currentUserId ? (
            <a href="mailto:someone@example.com?Subject=Hello%20again" >Send mail!</a>) : 
            (
              <div>
                <a href="/api/auth/github/" onClick={() => helpers.userAuth(this.loggedIn.bind(this))}>Login</a>
              </div>
            ) 
          }
        </p>
      </div>
    );
  }

}

export default App;

