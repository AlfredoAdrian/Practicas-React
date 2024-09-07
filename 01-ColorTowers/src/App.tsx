import { useEffect, useState } from "react";
import "./App.css";

const colors = ["red", "orange", "yellow", "green", "blue", "pink"];
const InitEmptyColumn = 1;
const heigthtowers = 15;
const numberTowers = 7;

const Item = ({ color, index, tower, updateItemSelected }) => {
  const handleClick = () => {
    updateItemSelected({ color, index, tower });
  };
  return (
    <div
      onClick={handleClick}
      className="ItemTower"
      key={index}
      style={{ backgroundColor: color }}
    ></div>
  );
};

const Tower = ({ colores, indexTower, updateItemSelected }) => {
  return (
    <div key={indexTower} className="Torre">
      {colores.reverse().map((color: any, index: any) => {
        return (
          <Item
            color={color}
            index={index}
            tower={indexTower}
            updateItemSelected={updateItemSelected}
          />
        );
      })}
    </div>
  );
};

function App() {
  const [Towers, setTowers] = useState([]);
  const [itemSelected, setItemSelected] = useState({});

  const createtowers = () => {
    let randomColorToewers: any = [];
    for (let i = 0; i < numberTowers; i++) {
      let newTowerColor = Array(heigthtowers).fill(null);
      if (i !== InitEmptyColumn) {
        newTowerColor = newTowerColor.map((e) => {
          return colors[Math.floor(Math.random() * colors.length)];
        });
      }
      randomColorToewers = [...randomColorToewers, newTowerColor];
    }
    setTowers(randomColorToewers);
  };
  //actualizar la torre selecioanda y la nueva seleccionada
  const updatetowerSelected = (oldaItem: any, newItem: any) => {
    console.log("actualizando", oldaItem, newItem);
    let newTowers = [...Towers];
    newTowers[oldaItem.tower][oldaItem.index] = newItem.color;
    newTowers[newItem.tower][newItem.index] = oldaItem.color;
    setTowers(newTowers);
  };
  const updateItemSelected = (item: any) => {
    // console.log("item nuevo", item, "seleccionado Actual", itemSelected);
    if (item.tower === itemSelected.tower) {
      return;
    }
    if (itemSelected.color) updatetowerSelected(itemSelected, item);

    setItemSelected(item);
  };
  // useEffect(() =>  createtowers(), []);
  useEffect(() => {
    createtowers();
    setItemSelected({});
  }, []);
  // useEffect(() => itemSelected, []);
  useEffect(() => {}, [itemSelected]);

  return (
    <>
      <main className="App">
        <h1>Color Towers</h1>
        <section>
          ¡Juega y gana! ¡No te pierdas! separara los colores en columnas, cada
          columna tiene un color
        </section>
        <section className="Game">
          {Towers.map((row, index) => {
            return (
              <Tower
                colores={row}
                indexTower={index}
                updateItemSelected={updateItemSelected}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}

export default App;
