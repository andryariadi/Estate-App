import { useSearchParams } from "react-router-dom";
import "./filter.scss";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <>
      <div className="filter">
        <h1>
          Search result for <b>{query.city}</b>
        </h1>
        <div className="top">
          <div className="item">
            <label htmlFor="city">Location</label>
            <input type="text" id="city" name="city" value={query.city} onChange={handleChange} defaultValue={query.city} placeholder="City Location" />
          </div>
        </div>
        <div className="bottom">
          <div className="item">
            <label htmlFor="type">Type</label>
            <select name="type" id="type" value={query.type} onChange={handleChange} defaultValue={query.type}>
              <option value="" disabled>
                Any
              </option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="property">Property</label>
            <select name="property" id="property" value={query.property} onChange={handleChange} defaultValue={query.property}>
              <option value="" disabled>
                Any
              </option>
              <option value="apartment">Apartment</option>
              <option value="hosue">hosue</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="minPrice">Min Price</label>
            <input type="number" id="minPrice" name="minPrice" value={query.minPrice} onChange={handleChange} defaultValue={query.minPrice} placeholder="Any" />
          </div>
          <div className="item">
            <label htmlFor="maxPrice">Max Price</label>
            <input type="number" id="maxPrice" name="maxPrice" value={query.maxPrice} onChange={handleChange} defaultValue={query.maxPrice} placeholder="Any" />
          </div>
          <div className="item">
            <label htmlFor="bedroom">Bedroom</label>
            <input type="text" id="bedroom" name="bedroom" value={query.bedroom} onChange={handleChange} defaultValue={query.bedroom} placeholder="Any" />
          </div>
          <button onClick={handleFilter}>
            <div className="searchIcon">
              <IoSearchOutline size={28} />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
