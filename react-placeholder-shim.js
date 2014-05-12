/** @jsx React.DOM */

(function (window, React){
  'use strict';

  var Input;
  var TextArea;

  function createPlaceholderComponent(DOMComponent) {
    // return this
    var DOMComponentPlaceholder = React.createClass({displayName: 'DOMComponentPlaceholder',
      componentDidMount: function() {
        this.updatePlaceholder();
      },

      componentDidUpdate: function() {
        this.updatePlaceholder();
      },

      updatePlaceholder: function() {
        var input = this.refs.input.getDOMNode();
        var placeholder = this.refs.placeholder.getDOMNode();
        if (input.value !== '') {
          placeholder.style.display = 'none';
          return;
        }
        placeholder.style.display = 'block';

        // we'll suppose this is ie, which stores css props in `currentStyle`
        var inputStyle = input.currentStyle;

        if (inputStyle) {
          var topOffset = (parseInt(inputStyle.marginTop) || 0) +
            (parseInt(inputStyle.paddingTop) || 0) +
            (parseInt(inputStyle.borderTopWidth) || 0);

          var leftOffset = (parseInt(inputStyle.marginLeft) || 0) +
            (parseInt(inputStyle.paddingLeft) || 0) +
            (parseInt(inputStyle.borderLeftWidth) || 0);

          var fontFamily = inputStyle.fontFamily;
          var fontWeight = inputStyle.fontWeight;
          var fontVariant = inputStyle.fontVariant;
          var fontSize = inputStyle.fontSize;
          var fontStyle = inputStyle.fontStyle;

          var placeholderStyle = placeholder.style;
          placeholderStyle.top = topOffset + 'px';
          placeholderStyle.left = leftOffset + 'px';
          placeholderStyle.fontFamily = fontFamily;
          placeholderStyle.fontWeight = fontWeight;
          placeholderStyle.fontVariant = fontVariant;
          placeholderStyle.fontSize = fontSize;
          placeholderStyle.fontStyle = fontStyle;
        }
      },

      handlePlaceholderClick: function(a, b, c) {
        this.refs.input.getDOMNode().focus();
        this.props.onClick && this.props.onClick(a, b, c);
      },

      handleChange: function(a, b, c) {
        // If `defaultValue` is used (aka, no `value` + change handling) then
        // force update to trigger `updatePlaceholder`.
        this.forceUpdate(function() {
          this.props.onChange && this.props.onChange(a, b, c);
        }.bind(this));
      },

      render: function() {
        var wrapperStyle = {position: 'relative'};
        var placeholderStyle = {
          position: 'absolute',
          color: '#999999'
        };

        return (
          React.DOM.div( {style:wrapperStyle}, 
            
              this.transferPropsTo(
                DOMComponent( {ref:"input", onChange:this.handleChange} )
              ),
            
            React.DOM.div(
              {ref:"placeholder",
              onClick:this.handlePlaceholderClick,
              style:placeholderStyle}, 
                this.props.placeholder
            )
          )
        );
      }
    });

    return DOMComponentPlaceholder;
  }

  var testNode = document.createElement('input');
  var hasPlaceHolderAttr = 'placeholder' in testNode;

  if (hasPlaceHolderAttr) {
    Input = React.DOM.input;
    TextArea = React.DOM.textarea;
  } else {
    Input = createPlaceholderComponent(React.DOM.input);
    TextArea = createPlaceholderComponent(React.DOM.textarea);
  }

  if (typeof module === 'undefined') {
    window.placeholderShim = {
      Input: Input,
      TextArea: TextArea,
    };
  } else {
    module.exports = {
      Input: Input,
      TextArea: TextArea
    };
  }
})(window, React || require('React'));
