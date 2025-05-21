import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Country, City } from 'country-state-city';
// import './CountryCityForm.css';

const CountryCityForm = () => {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  useEffect(() => {
    if (selectedCountry) {
      const cities = City.getCitiesOfCountry(selectedCountry.value) || [];
      setCityOptions(
        cities.map((city) => ({
          value: city.name,
          label: city.name,
        }))
      );
    } else {
      setCityOptions([]);
      setSelectedCity(null);
    }
  }, [selectedCountry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search:', search);
    console.log('Country:', selectedCountry?.label);
    console.log('City:', selectedCity?.label);
  };

  return (
    <div className="search-wrapper d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="glass-card">
        <h2 className="text-center mb-4">Explore Locations</h2>
        {/* <h2 className="text-center mb-4">🌍 Explore Locations</h2> */}

        <div className="mb-3 input-icon-wrapper">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass input-icon"></i>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Country :</label>
          <Select
            options={countryOptions}
            value={selectedCountry}
            onChange={setSelectedCountry}
            placeholder="Select Country"
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">City :</label>
          <Select
            options={cityOptions}
            value={selectedCity}
            onChange={setSelectedCity}
            placeholder="Select City"
            isDisabled={!selectedCountry}
          />
        </div>

        <button type="submit" className="submit-btn w-100">
          Submit <span className="ms-2"><i className="fa-solid fa-arrow-right"></i></span>
        </button>
      </form>
    </div>
  );
};

export default CountryCityForm;
