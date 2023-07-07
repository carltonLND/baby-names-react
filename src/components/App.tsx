import "./App.css";
import { useMemo, useState } from "react";
import babyNames from "../babyNamesData.json";
import { BabyNameCard } from "./babyName";
import { sortNames, BabyNameData } from "../utils/sortNames";
import { NameFilter, FilterState } from "./nameFilter";

export default function App() {
  const sortedNames = useMemo(() => sortNames(babyNames), []);
  const [remainingNames, setRemainingNames] = useState(sortedNames);
  const [favoriteNames, setFavoriteNames] = useState<BabyNameData[]>([]);
  const [sexState, setSexState] = useState<FilterState>("all");

  const handleOnClickAll = (babyName: BabyNameData) => {
    setFavoriteNames((prevFavs) => {
      const newFavorites = [...prevFavs];

      setRemainingNames((prev) => {
        const newNames = [...prev];
        const nameIndex = newNames.indexOf(babyName);
        const selectedName = newNames.splice(nameIndex, 1)[0];
        newFavorites.push(selectedName);

        return newNames;
      });

      return newFavorites;
    });
  };

  const handleOnClickFav = (babyName: BabyNameData) => {
    setFavoriteNames((prevFavs) => {
      const favoriteNames = [...prevFavs];

      setRemainingNames((prev) => {
        const nameIndex = favoriteNames.indexOf(babyName);
        const selectedName = favoriteNames.splice(nameIndex, 1)[0];
        const newNames = [...prev];
        newNames.push(selectedName);
        const filteredNewNames = newNames.filter(({ sex }) =>
          sexState === "all" ? true : sexState === sex
        );

        return sortNames(filteredNewNames);
      });

      return favoriteNames;
    });
  };

  const handleSearch = (str: string) => {
    const filteredNames = filterByName(str);
    setRemainingNames(filteredNames);
  };

  const handleFilter = (sexFilter: FilterState, searchString: string) => {
    const filteredNames = filterByName(searchString).filter(({ sex }) =>
      sexFilter === "all" ? true : sex === sexFilter
    );
    setRemainingNames(filteredNames);
    setSexState(sexFilter);
  };

  const filterByName = (str: string) => {
    const searchString = str.toLowerCase();
    return sortedNames
      .filter((babyName) => !favoriteNames.includes(babyName))
      .filter(({ name }) => name.toLowerCase().startsWith(searchString));
  };

  return (
    <div className="App-container">
      <div className="App">
        <NameFilter handleSearch={handleSearch} handleClick={handleFilter} />
        <section className="fav-container">
          <h2 className="fav-title">Favourites:</h2>
          <section className="name-container">
            {mapBabyNames(favoriteNames, handleOnClickFav)}
          </section>
        </section>
        <div className="divider"></div>
        <section className="name-container">
          {mapBabyNames(remainingNames, handleOnClickAll)}
        </section>
        <div className="divider"></div>
      </div>
    </div>
  );
}

function mapBabyNames(
  babyNameArray: BabyNameData[],
  handler: (babyName: BabyNameData) => void
): JSX.Element[] {
  return babyNameArray.map((babyName: BabyNameData, index) => {
    return (
      <BabyNameCard
        onClick={() => handler(babyName)}
        key={index}
        id={babyName.id}
        name={babyName.name}
        sex={babyName.sex}
      />
    );
  });
}
