import "./App.css";
import { useMemo } from "react";
import babyNames from "../babyNamesData.json";
import { BabyNameCard } from "./babyName";
import { sortNames } from "../utils/sortNames";

function App() {
  const babyNamesAll = useMemo(() => sortNames(babyNames), []);

  return (
    <div className="App-container">
      <div className="App">
        <div className="divider"></div>
        <section className="name-container">
          {babyNamesAll.map(({ id, name, sex }) => {
            return <BabyNameCard key={id} name={name} sex={sex} />;
          })}
        </section>
        <div className="divider"></div>
      </div>
    </div>
  );
}

export default App;
