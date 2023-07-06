import "./App.css";
import { useMemo, useState } from "react";
import babyNames from "../babyNamesData.json";
import { BabyNameCard } from "./babyName";
import { sortNames, BabyNameData } from "../utils/sortNames";
import { NameFilter, FilterState } from "./nameFilter";

function App() {
  const sortedNames = useMemo(() => sortNames(babyNames), []);
  const [remainingNames, setRemainingNames] = useState(sortedNames);
  const [favoriteNames, setFavoriteNames] = useState<BabyNameData[]>([]);
  //@ts-ignore
  const [sexState, setSexState] = useState<FilterState>("all");

  const handleOnClickAll = (babyName: BabyNameData) => {
    let selectedName: BabyNameData;

    setRemainingNames((prev) => {
      const newNames = [...prev];
      const nameIndex = newNames.indexOf(babyName);
      selectedName = newNames.splice(nameIndex, 1)[0];
      return newNames;
    });

    setFavoriteNames((prev) => {
      const newFavorites = [...prev];
      newFavorites.push(selectedName);
      return newFavorites;
    });
  };

  const handleOnClickFav = (babyName: BabyNameData) => {
    setFavoriteNames((prev) => {
      const favoriteNames = [...prev];
      const nameIndex = favoriteNames.indexOf(babyName);
      const selectedName = favoriteNames.splice(nameIndex, 1)[0];

      // dirty fix, is executed twice...
      setRemainingNames((prev) => {
        const newNames = [...prev];
        newNames.push(selectedName);
        return sortNames(newNames).filter(({ sex }) => {
          return sexState === "all" ? true : sexState === sex;
        });
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
        <h2 className="fav-title">Favourites:</h2>
        <section className="name-container">
          {mapBabyNames(favoriteNames, handleOnClickFav)}
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

export default App;

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
