import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import PropTypes from "prop-types";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

function CountriesList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="add your first city by clicking on a city on map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, idx) => (
        <CountryItem country={country} key={idx} />
      ))}
    </ul>
  );
}

export default CountriesList;

CountriesList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};
