import { useEffect, useState } from "react";
import "./App.css";

const colors = ["red", "orange", "yellow", "green", "blue", "pink"];
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
  const [InitEmptyColumn, setInitEmptyColumn] = useState(1);

  // Metodos
  const generateinitialEmptyColumn = () => {
    let randomEmptyColumn = Math.floor(Math.random() * numberTowers);
    setInitEmptyColumn(randomEmptyColumn);
  };
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
  const updatetowerSelected = (oldaItem: any, newItem: any) => {
    let newTowers = [...Towers];
    let hasEmptyPosition = newTowers[newItem.tower].some((t) => t === null);
    if (hasEmptyPosition) {
      let emptyColumnIndex = newTowers[newItem.tower].findIndex(
        (t) => t === null
      );
      if (emptyColumnIndex === 0) {
        newTowers[oldaItem.tower][oldaItem.index] = null;
        newTowers[newItem.tower][emptyColumnIndex] = oldaItem.color;
      } else {
        let previusColor = newTowers[newItem.tower][emptyColumnIndex - 1];
        if (previusColor === oldaItem.color) {
          newTowers[oldaItem.tower][oldaItem.index] = null;
          newTowers[newItem.tower][emptyColumnIndex] = oldaItem.color;
        } else {
          setItemSelected({});
          return;
        }
      }
      setTowers(newTowers);
      setItemSelected({});
    } else return;
  };
  const updateItemSelected = (item: any) => {
    if (item.tower === itemSelected.tower) return;
    if (item.color) {
      let lastindex = Towers[item.tower].filter((e) => e != null).length - 1;
      if (lastindex >= 0 && item.index !== lastindex) return;
    }
    if (itemSelected.color) updatetowerSelected(itemSelected, item);
    setItemSelected(item);
  };
  const resetGame = () => {
    createtowers();
    setItemSelected({});
  };

  // efectos
  useEffect(() => {
    generateinitialEmptyColumn();
    createtowers();
    setItemSelected({});
  }, []);
  useEffect(() => {
    console.log("Elemento seleccionado: ", itemSelected);
  }, [itemSelected]);

  return (
    <>
      <main className="App">
        <h2>Color Towers</h2>
        <section className="Info">
          <div className="InfoGame">
            Ordena los colores de tus towers para ganar el juego
          </div>
          <div className="TowersInfo">
            <p>Number of towers: {numberTowers}</p>
            <p>Height of towers: {heigthtowers}</p>
          </div>
          <div className="ButtonsGame">
            <button onClick={resetGame}>Reset Game</button>
            <button onClick={generateinitialEmptyColumn}>
              Change Empty Column
            </button>
          </div>
          <div className="ItemActualinfo">
            Color Actual
            <div
              className="SquareColor"
              style={{ backgroundColor: itemSelected.color }}
            ></div>
          </div>
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
