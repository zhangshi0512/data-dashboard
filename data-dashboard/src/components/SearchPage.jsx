import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Card from "./Card";

const SearchPage = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // Initialize cities to an empty array
  const cities = props.cities || [];

  // Only filter cities if it's defined
  const filteredCities =
    cities.length > 0
      ? cities.filter((city) =>
          city.city.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  useEffect(() => {
    if (selectedCity) {
      // Fetch weather data for the selected city
      // Use the fetchWeatherDataForCity function you've defined in App.jsx or elsewhere
      props
        .fetchWeatherDataForCity(selectedCity.city, selectedCity.country)
        .then((data) => setWeatherData(data))
        .catch((err) => console.error(err));
    }
  }, [selectedCity]);

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setWeatherData={setWeatherData}
        suggestions={filteredCities}
        onSelectCity={setSelectedCity}
      />
      {weatherData && <Card data={weatherData} />}
    </div>
  );
};

export default SearchPage;
