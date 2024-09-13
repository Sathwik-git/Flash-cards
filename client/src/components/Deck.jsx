function Deck(props) {
  async function onDelete(deckId) {
    const response = await fetch(`http://localhost:3000/decks/${deckId}`, {
      method: "DELETE",
    });
    const deletedDeck = response.json();

    props.setDecks(props.decks.filter((deck) => deck._id !== deckId));
  }

  return (
    <>
      <div className="group relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex items-center justify-center h-48 w-80 hover:cursor-pointer">
        <button
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 bg-transparent hover:bg-red-500 hover:text-white font-bold py-1 px-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out w-8 h-8"
          onClick={() => onDelete(props.id)}
        >
          X
        </button>
        <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.title}
        </div>
      </div>
    </>
  );
}

export default Deck;
