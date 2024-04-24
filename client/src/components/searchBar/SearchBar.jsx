import { useState } from "react";
import "./searchBar.scss";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

export default function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  console.log(query, "<----disearchbar");

  return (
    <>
      <div className="searchContainer">
        <div className="type">
          {types.map((type) => (
            <button key={type} className={query.type === type ? "active" : ""} onClick={() => setQuery({ ...query, type: type })}>
              {type}
            </button>
          ))}
        </div>
        <form action="">
          <input type="text" name="city" value={query.city} placeholder="City Location" onChange={handleChange} />
          <input type="number" name="minPrice" value={query.minPrice} min={0} max={10000000} placeholder="Min Price" onChange={handleChange} />
          <input type="number" name="maxPrice" value={query.maxPrice} min={0} max={10000000} placeholder="Max Price" onChange={handleChange} />
          <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
            <button>
              <div className="searchIcon">
                <IoSearchOutline size={28} />
              </div>
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}
