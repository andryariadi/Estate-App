import { useState } from "react";
import "./searchBar.scss";
import { IoSearchOutline } from "react-icons/io5";

const types = ["buy", "rent"];

export default function SearchBar() {
  const [value, setValue] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  console.log(value, "<----disearchbar");

  return (
    <>
      <div className="searchContainer">
        <div className="type">
          {types.map((type) => (
            <button key={type} className={value.type === type ? "active" : ""} onClick={() => setValue({ ...value, type: type })}>
              {type}
            </button>
          ))}
        </div>
        <form action="">
          <input type="text" name="city" placeholder="City Location" />
          <input type="number" name="minPrice" min={0} max={10000000} placeholder="Min Price" />
          <input type="number" name="maxPrice" min={0} max={10000000} placeholder="Max Price" />
          <button>
            <div className="searchIcon">
              <IoSearchOutline size={28} />
            </div>
          </button>
        </form>
      </div>
    </>
  );
}
