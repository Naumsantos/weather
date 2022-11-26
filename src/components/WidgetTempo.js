import React, { Component } from "react";
class WidgetClimaHora extends Component {
  render() {
    return <div className="weatherTime">
      <p className='hour'> {this.props.hour}</p>
      <img className='img' src={this.props.img} alt="Icone tempo" />
      <p className='deg'>{`${this.props.deg}°C`}</p>
    </div>
  };
};

export default WidgetClimaHora;