//Basic Stateless Functional Component
let Listing = (props) => (
  <div>
    <p>{props.listing.date}</p>
    <p>{props.listing.location}</p>
    <p>{props.listing.price}</p>
    <p>{props.listing.title}</p>
    <p>{props.listing.description}</p>
  </div>
);