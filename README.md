# [React](http://facebook.github.io/react/)-inputplaceholder

Form placeholder for input and textarea in ie8 and 9.

## install

```sh
bower install react-inputplaceholder
```

Or simply drop the script somewhere on your page (after React of course):

```html
<script src="path/to/react-inputplaceholder.js"></script>
```

## API

#### &lt;InputPlaceholder />
For inputs type of `text` and `password`.

#### &lt;TextAreaPlaceholder />
For `textarea`.

## Usage

```html
/**
* @jsx React.DOM
*/

// try this on ie!
var Demo = React.createClass({
  render: function() {
    return (
      <InputPlaceholder 
        type="text" 
        placeholder="asd" 
        onChange={this.handleChange}/>
    )
  },

  handleChange: function(a, b, c) {
    console.log('it all just works!');
  }
});

React.renderComponent(<Demo/>, document.body);
```

## License

MIT.
