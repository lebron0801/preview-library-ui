import React from 'react';
import TemperatureInput from './TemperatureInput';

function BoilingVerdict(props: any) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }

  return <p>The water would not boil.</p>;
}

function tryConvert(temperature: string, convert: (str: number) => number) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function toCelsius(fahrenheit: number) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius: number) {
  return (celsius * 9) / 5 + 32;
}

type StateType = {
  scale: string;
  temperature: string;
};

class Calculator extends React.Component<any, StateType> {
  constructor(props: any) {
    super(props);

    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { temperature: '', scale: 'c' };
  }

  handleCelsiusChange(temperature: string) {
    this.setState({ scale: 'c', temperature });
  }

  handleFahrenheitChange(temperature: string) {
    this.setState({ scale: 'f', temperature });
  }

  render(): React.ReactNode {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

export default Calculator;
