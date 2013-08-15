/**
* @jsx React.DOM
*/

var InputPlaceholder;
var TextAreaPlaceholder;

(function (){
  function createPlaceholderComponent(DOMComponent) {
    // return this
    var DOMComponentPlaceholder = React.createClass({displayName: 'DOMComponentPlaceholder',
      getInitialState: function() {
        var props = this.props;
        var showPlaceholder = (props.placeholder != null &&
            (props.value === '' ||
              (props.value == null && props.defaultValue === '')));

        return {showPlaceholder: showPlaceholder};
      },

      componentDidMount: function() {
        if (this.refs.placeholder) {
          $(this.refs.input.getDOMNode()).css('margin-left');

          var asd=$(this.refs.input.getDOMNode()).css('padding-left');
          $(this.refs.placeholder.getDOMNode()).css('left', asd);
        }
      },

      componentDidUpdate: function() {
        var refs = this.refs;
        var $input = refs.input.getDOMNode();

        if (refs.placeholder) {
          var $placeholder = refs.placeholder.getDOMNode();

          // we'll suppose this is ie, which stores css props in `currentStyle`
          var inputStyle = $input.currentStyle;

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

            var placeholderStyle = $placeholder.style;
            placeholderStyle.top = topOffset + 'px';
            placeholderStyle.left = leftOffset + 'px';
            placeholderStyle.fontFamily = fontFamily;
            placeholderStyle.fontWeight = fontWeight;
            placeholderStyle.fontVariant = fontVariant;
            placeholderStyle.fontSize = fontSize;
            placeholderStyle.fontStyle = fontStyle;
          }
        }
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
                DOMComponent(
                  {ref:"input",
                  onChange:this.handleChange})
              ),
            
            
              this.state.showPlaceholder
                ? React.DOM.div(
                    {ref:"placeholder",
                    onClick:this.handleClick,
                    style:placeholderStyle}, 
                    this.props.placeholder
                  )
                : null
            
          )
        );
      },

      handleClick: function(event, a) {
        this.refs.input.getDOMNode().focus();
        this.props.onClick && this.props.onClick(event, a)
      },

      handleChange: function(event, arg) {
        this.setState({showPlaceholder: event.target.value === ''});
        this.props.onChange && this.props.onChange(event, arg);
      }
    });

    return DOMComponentPlaceholder;
  }

  var testNode = document.createElement('input');
  var hasPlaceHolderAttr = 'placeholder' in testNode;

  if (hasPlaceHolderAttr) {
    InputPlaceholder = React.DOM.input;
    TextAreaPlaceholder = React.DOM.textarea;
  } else {
    InputPlaceholder = createPlaceholderComponent(React.DOM.input);
    TextAreaPlaceholder = createPlaceholderComponent(React.DOM.textarea);
  }

})();
