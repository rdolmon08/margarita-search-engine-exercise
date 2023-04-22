import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "semantic-ui-react";

export default function App() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`
      )
      .then((response) => {
        setAPIData(response.data.drinks);
      });
  }, []);

  const searchItems = (searchValue) => {
    // searchInput = 1
    // if I call setSearchInput(2)
    // you would EXPECT searchInput here to now be 2
    // BUT it's NOT, it's still 1 inside this instance
    // of the function
    setSearchInput(searchValue);

    if (searchValue !== "") {
      const filteredData = APIData.filter((drinks) => {
        return Object.values(drinks)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  return (
    <div>
      <Input
        icon="search"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
      {searchInput.length > 1 ? (
        filteredResults.map((drinks) => {
          return (
            <div>
              <p>{drinks.strDrink}</p>
              <p>{drinks.strGlass}</p>
              <p>{drinks.strInstructions}</p>
            </div>
          );
        })
      ) : (
        <>
          {APIData.map((drinks) => {
            return (
              <div>
                <p>{drinks.strDrink}</p>
                <p>{drinks.strGlass}</p>
                <p>{drinks.strInstructions}</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

// https://www.freecodecamp.org/news/build-a-search-filter-using-react-and-react-hooks/
