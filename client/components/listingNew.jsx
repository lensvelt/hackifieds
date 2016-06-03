

var Registration = React.createClass({
  getInitialState: function() {
    return {
      step: 1
    }
  },

   // file: Registration.jsx

  var fieldValues = {
    name     : null,
    email    : null,
    password : null,
    age      : null,
    colors   : []
  }

  saveValues: function(fields) {
    return function() {
      // Remember, `fieldValues` is set at the top of this file, we are simply appending
      // to and overriding keys in `fieldValues` with the `fields` with Object.assign
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
      fieldValues = Object.assign({}, fieldValues, fields)
    }()
  },

  render: function() {
    switch (this.state.step) {
      case 1:
        return <AccountFields />
      case 2:
        return <SurveyFields />
      case 3:
        return <Confirmation />
      case 4:
        return <Success />
    }
  }
}


module.exports = Registration

title: 'This is an example title',
description: 'This is an example description',
location: 'Location' + Math.floor(Math.random() * 10),
price: Math.floor(Math.random() * 2000),
startDate: Date.now(),
endDate: Date.now(),
createdAt: Date.now(),
updatedAt: Date.now(),
userId: 3,
categoryId: categories[category]

var AccountFields = React.createClass({
  render: function() {
    return ( 
      <div>
        <label>Title</label> 
        <input type="text"
               ref="title"
               required
               placeholder="Add A Title For Your Listing"/>

        <label>Location</label> 
        <input type="text"
               ref="location"
               required
               placeholder="Your Location"/>

        <label>Price</label> 
        <input type="text"
               ref="price"
               required
               defaultValue=0/>

        <label>Rent / Buy / Hack</label> 
        <select type="text"
                ref="category"
                required
                defaultValue={ this.props.navCategory } />

        <label>Description</label>
        <input type="text"
               ref="description"
               required
               placeholder="Add The Details Of Your Listing"/>

        <button onClick={ this.saveValues }>Post Listing</button>
      </div>
    )
  },

    saveAndContinue: function(e) {
      e.preventDefault()

      // Get values via this.refs
      var data = {
        title     : this.refs.name.getDOMNode().value,
        password : this.refs.password.getDOMNode().value,
        email    : this.refs.email.getDOMNode().value,
      }

      this.props.saveValues(data)
      this.props.nextStep()
    }
  })

  module.exports = AccountFields