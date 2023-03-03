import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

function App() {
  const [fruits, setFruits] = useState([]);
  const [selectedFruit, setSelectedFruit] = useState(null);

  useEffect(() => {
    axios
      .get("http://pocs.digitalpages.com.br/mock/api/fruits-api/fruits.json")
      .then((response) => {
        setFruits(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCardClick = (fruit) => {
    setSelectedFruit(fruit);
  };

  const handleBackClick = () => {
    setSelectedFruit(null);
  };

  const renderFruitCards = () => {
    return fruits.map((fruit) => (
      <div className="card" key={fruit.id} onClick={() => handleCardClick(fruit)}>
        <img src={fruit.photo} alt={fruit.name} />
        <h3>{fruit.name}</h3>
        <button>Detalhes</button>
      </div>
    ));
  };

  const renderFruitDetails = () => {
    return (
      <div className="details">
        <img src={selectedFruit.photo} alt={selectedFruit.name} />
        <h3>{selectedFruit.name}</h3>
        <p>Calorias: {selectedFruit.calories}</p>
        <p>Proteína: {selectedFruit.protein}</p>
        <p>Carboidratos: {selectedFruit.carbohydrates}</p>
        <p>Fibra: {selectedFruit.fiber}</p>
        <p>Gordura: {selectedFruit.fat}</p>
        <p>Porção: {selectedFruit.portion}</p>
        <button onClick={handleBackClick}>Voltar</button>
      </div>
    );
  };

  return <div className="container">{selectedFruit ? renderFruitDetails() : renderFruitCards()}</div>;
}

export default App;
