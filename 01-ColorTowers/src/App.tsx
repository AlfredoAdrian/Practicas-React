import { useEffect, useState } from "react";
import "./App.css";

// const colors = ["red", "orange", "yellow", "green", "blue", "pink"];
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
  // const itemSelected = useRef({ index: null, color: null, tower: null });
  const [Towers, setTowers] = useState([]);
  const [InitEmptyColumn, setInitEmptyColumn] = useState(1);
  const [itemSelected, setItemSelected] = useState({
    index: null,
    color: null,
    tower: null,
  });

  // Metodos
  const generateinitialEmptyColumn = () => {
    let randomEmptyColumn = Math.floor(Math.random() * numberTowers);
    setInitEmptyColumn(randomEmptyColumn);
  };
  const createtowers = () => {
    let colores_diponibles: any = [
      { color: "red", restantes: 10 },
      { color: "orange", restantes: 10 },
      { color: "yellow", restantes: 10 },
      { color: "green", restantes: 10 },
      { color: "blue", restantes: 10 },
      { color: "pink", restantes: 10 },
    ];
    let randomColorToewers: any = [];
    for (let i = 0; i < numberTowers; i++) {
      let newTowerColor = Array(heigthtowers).fill(null);
      if (i !== InitEmptyColumn) {
        newTowerColor = newTowerColor.map((new_color) => {
          let restantes = colores_diponibles.filter((e) => e.restantes > 0);
          if (restantes.length === 0) return null;
          let randomColor =
            restantes[Math.floor(Math.random() * restantes.length)];
          randomColor.restantes--;
          if (randomColor.restantes === 0)
            colores_diponibles = colores_diponibles.filter(
              (e) => e.color !== randomColor.color
            );
          return randomColor.color;
        });
      }
      randomColorToewers = [...randomColorToewers, newTowerColor];
    }
    setTowers(randomColorToewers);
  };
  const updatetowerSelected = (oldItem: any, newItem: any) => {
    let newTowers = [...Towers];
    let hasEmptyPosition = newTowers[newItem.tower].some((t) => t === null);
    if (hasEmptyPosition) {
      let emptyColumnIndex = newTowers[newItem.tower].findIndex(
        (t) => t === null
      );
      if (emptyColumnIndex === 0) {
        newTowers[oldItem.tower][oldItem.index] = null;
        newTowers[newItem.tower][emptyColumnIndex] = oldItem.color;
      } else {
        let previusColor = newTowers[newItem.tower][emptyColumnIndex - 1];
        if (previusColor === oldItem.color) {
          newTowers[oldItem.tower][oldItem.index] = null;
          newTowers[newItem.tower][emptyColumnIndex] = oldItem.color;
        } else {
          setItemSelected({ index: null, color: null, tower: null });
          return;
        }
      }
      setTowers(newTowers);
      setItemSelected({ index: null, color: null, tower: null });
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
    setItemSelected({ index: null, color: null, tower: null });
  };

  // efectos
  useEffect(() => {
    generateinitialEmptyColumn();
    createtowers();
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
            Ordena los colores de als torres para ganar el juego
          </div>
          <div className="TowersInfo">
            <p>Numero de Torres: {numberTowers}</p>
            <p>Máxima Altura de las Torres: {heigthtowers}</p>
          </div>
          <div className="ButtonsGame">
            <button onClick={resetGame}>Reset Game</button>
            <button onClick={generateinitialEmptyColumn}>
              Change Empty Column
            </button>
          </div>
          <div className="ItemActualinfo">
            Color seleccionado actual
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
