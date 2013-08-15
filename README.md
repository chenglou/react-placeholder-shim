# [React](http://facebook.github.io/react/)-inputplaceholder

Form input/textrea placeholder for Internet Explorer 8 and 9.

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
For inputs type of `text` and `passowrd`.

#### &lt;TextAreaPlaceholder />
For `textarea`.

## Usage

```html
/**
* @jsx React.DOM
*/
var Demo = React.createClass({
  render: function() {
    return (
      <InputPlaceholder 
        type="password" 
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
