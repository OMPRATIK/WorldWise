import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCitites] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCitites() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCitites(data);
      } catch (error) {
        alert("There was an error while loading");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCitites();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert("There was an error while loading");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context used outside provider");
  return context;
}

CitiesProvider.propTypes = {
  children: PropTypes.any,
};

export { CitiesProvider, useCities };
