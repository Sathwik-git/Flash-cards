import { useEffect, useState } from "react";
import Deck from "./components/Deck";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [decks, setDecks] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  async function handleCreateDeck(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: inputValue,
      }),
    });
    const deck = await response.json();
    setDecks([...decks, deck]);

    setInputValue("");
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch("http://localhost:3000/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  return (
    <div className="bg-neutral-800">
      <div className="grid grid-cols-3 gap-4 p-10">
        {decks.map((deck) => (
          <Deck
            key={deck._id}
            title={deck.title}
            setDecks={setDecks}
            decks={decks}
            id={deck._id}
          />
        ))}
      </div>

      <form onSubmit={handleCreateDeck}>
        <div className="flex gap-3 justify-center items-center">
          <input
            type="text"
            onChange={handleInputChange}
            value={inputValue}
            className="dark:bg-gray-800 text-white w-1/5 pl-5 pr-3 py-2 bg-transparent  rounded-lg"
          />
          <button class="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-xl text-sm px-5 py-2.5 me-2 mb-2">
            create Deck
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
