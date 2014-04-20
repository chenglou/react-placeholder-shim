# [React](http://facebook.github.io/react/)-placeholder-shim

Form placeholder for input and textarea in ie8 and 9.

## install

Npm:
```sh
npm install react-placeholder-shim
```

Bower:
```sh
bower install react-placeholder-shim
```

Or simply drop the script somewhere on your page (after React of course):

```html
<script src="path/to/react-placeholder-shim.js"></script>
```

## API

The module exposes the `placeholderShim` object globally if it doesn't detect cjs (npm). Otherwise, it exports the object.

The object contains two components.

#### <Input />
For inputs type of `text` and `password`.

#### <TextArea />
For `textarea`.

## Usage

```html
/** @jsx React.DOM */
// Assuming the library's dropped in as a script tag.
var Input = placeholderShim.Input;

// try this on IE!
var Demo = React.createClass({
  render: function() {
    return (
      <Input type="text"placeholder="hi"onChange={this.handleChange} />
    )
  },

  handleChange: function(a, b, c) {
    console.log('it all just works!');
  }
});

React.renderComponent(<Demo />, document.body);
```

## License

MIT.
