const { DOM } = React;
const { bind } = _;

class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      left: 0,
      fixed: true,
      grabPointX: 0,
      grabPointY: 0
    };
    this.unfixElement = bind(this.unfixElement, this);
    this.fixElement = bind(this.fixElement, this);
    this.moveElement = bind(this.moveElement, this);
  }
  unfixElement(e){
    e.stopPropagation();
    this.setState({
      fixed: false,
      grabPointX: e.pageX,
      grabPointY: e.pageY
    });
  }
  fixElement(e){
    e.stopPropagation();
    this.setState({fixed: true});
  }
  moveElement(e){
    e.stopPropagation();
    if (!this.state.fixed) {
      const { top, left, grabPointX, grabPointY } = this.state;
      this.setState({
        left: left + (e.pageX - grabPointX),
        top: top + (e.pageY - grabPointY) ,
        grabPointX: e.pageX,
        grabPointY: e.pageY
      })
    };
  }
  render() {
    return DOM.div({
      onMouseDown: this.unfixElement,
      onMouseUp: this.fixElement,
      onMouseMove: this.moveElement,
      onMouseLeave: this.fixElement,
      style: {top: this.state.top, left: this.state.left},
      className: 'block'
    }, this.props.children);
  }
}

ReactDOM.render(
  React.createElement(Draggable, null, DOM.button({}, 'Drag me')),
  document.getElementById('app')
)
