import React, { useState } from "react"; //React 應用的啟動程式
import ReactDOM from "react-dom/client";
import "./index.css";
//import App from "./App";
import reportWebVitals from "./reportWebVitals";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  const [theme, setTheme] = useState("light");
  const openHour = 15;
  const closeHour = 22;
  // const [theme, setTheme] = React.useState(
  //   () => localStorage.getItem("theme") || "light"
  // );

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={`container ${theme}`}>
      <Header theme={theme} setTheme={setTheme} />
      <Menu />
      <Footer openHour={openHour} closeHour={closeHour} />
    </div>
  );
}

function Header({ theme, setTheme }) {
  //const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };

  const style = {};

  return (
    <header className="header">
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <h1 style={style}>Fast Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  // const pizzas = [];
  const numPizzas = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {numPizzas > 0 ? (
        <>
          <p>
            Authentic Italian cusisine. 6 Creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
              //<Pizza name={pizza.name} photoName={pizza.photoName} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later :)</p>
      )}
      {/* <ul className="pizzas">
        {pizzaData.map((pizza) => (
          <Pizza pizzaObj={pizza} key={pizza.name} />
          //<Pizza name={pizza.name} photoName={pizza.photoName} />
        ))}
      </ul> */}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  console.log(pizzaObj);
  //if (pizzaObj.soldOut) return null;

  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name}></img>
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        {/* {pizzaObj.soldOut ? (
          <span>SOLD OUT</span>
        ) : (
          <span>{pizzaObj.price}</span>
        )} for reference*/}
        <span>
          {pizzaObj.soldOut ? "SOLD OUT" : `$${pizzaObj.price.toFixed(2)}`}
        </span>
      </div>
    </li>
  );
}

function Footer(props) {
  console.log(props);
  const hour = new Date().getHours();
  const openHour = 15;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  //console.log(hour, isOpen);
  // if (hour >= openHour && hour <= closeHour) alert("We're currently open!");
  // else alert("Sorry we're closed");

  if (!isOpen)
    return (
      <p>
        We're happy to welcome you between {openHour}:00 and {closeHour}:00.
      </p>
    );

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} /> //??
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
  //return React.createElement('footer', null, "We're currently open!")
}

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        We're currently open from {openHour}:00 to {closeHour}:00. Come visit us
        or order online!
      </p>
      <button className="btn">Order Now 🛒</button>
    </div>
  );
}

//const Test = ()
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); //Web Vitals（效能追蹤，選用）
