import React from "react";
import cloudy from "./animated/cloudy.svg";
import fewCloudy from "./animated/cloudy-day-1.svg";
import fewCloudyNight from "./animated/cloudy-night-1.svg";
import partlyCloudy from "./animated/cloudy-day-3.svg";
import partlyCloudyNight from "./animated/cloudy-night-3.svg";
import day from "./animated/day.svg";
import night from "./animated/night.svg";
import rain from "./animated/rainy-6.svg";
import drizzleDay from "./animated/rainy-1.svg";
import drizzleNight from "./animated/rainy-5.svg";
import thunder from "./animated/thunder.svg";
import snow from "./animated/snowy-6.svg";
import "./App.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange() {}

  render() {
    return (
      <div className="search-div">
        <form>
          <input
            type="text"
            onChange={this.handleChange()}
            placeholder="Search for a City"
          ></input>
        </form>
      </div>
    );
  }
}

class Card extends React.Component {
  weatherIcons = {
    "01d": day,
    "01n": night,
    "02d": fewCloudy,
    "02n": fewCloudyNight,
    "03d": partlyCloudy,
    "03n": partlyCloudyNight,
    "04d": cloudy,
    "04n": cloudy,
    "09d": drizzleDay,
    "09n": drizzleNight,
    "10d": rain,
    "10n": rain,
    "11d": thunder,
    "11n": thunder,
    "13d": snow,
    "13n": snow,
    "50d": cloudy,
    "50n": cloudy,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      country: "",
      weather: "",
      weatherDesc: "",
      temp: "",
      feelsLike: "",
      humidity: "",
      image: "",
      search: 'Toronto',
    };
  }

  async getWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.search}&appid={YOUR API KEY}`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(weatherData);
    console.log(weatherData.main);
    this.setState({
      name: weatherData.name,
      country: weatherData.sys.country,
      weather: weatherData.weather[0].main,
      weatherDesc: "No clouds",
      temp: `${Math.round(parseInt(weatherData.main.temp) - 273.15)}°C`,
      feelsLike: `${Math.round(
        parseInt(weatherData.main.feels_like) - 273.15
      )}°C`,
      humidity: `${weatherData.main.humidity}%`,
      image: this.weatherIcons[weatherData.weather[0].icon],
    });
    console.log(weatherData);
    console.log(this.props.search);
    //p.textContent = `${Math.round(parseInt(weatherData.main.temp)-273.15)}°C`;
  }

  render() {
    return (
      <div className="weather-card">
        <p>
          {this.state.name}, {this.state.country}
        </p>
        <p className="top-text">{this.state.weather}</p>
        <img
          className="icon"
          src={this.state.image}
          style={{ width: 150, height: 150 }}
        />
        <p className="bottom-text">Temperature: {this.state.temp}</p>
        <p>Feels Like: {this.state.feelsLike}</p>
        <p>Humidity: {this.state.humidity}</p>
        {/* ALWAYS use onclick={() => function}} else it will fire
        the function everytime it re-renders*/}
        <button onClick={() => this.getWeather()}>Click</button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: 'Hdsjakflds',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({target}) {
    this.setState({
      data: target.value,
    });
  }

  handleClick() {
    console.log(this.state.data);
  }

  render() {
    return (
      <div className="App">
        <header></header>
        <div className="search-div">
          <form>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="Search for a City"
            ></input>
          </form>
          <button onClick={() => this.handleClick()}>Search</button>
        </div>
        <Card search={this.state.data}/>
      </div>
    );
  }
}

export default App;
