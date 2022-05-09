import React, { useState } from "react";
import axios from "axios";
import Player from "./Player";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [data, setData] = useState(null);

  const [answer, setAnswer] = useState(false);
  
  const handleSearch = (e) => {
    e.preventDefault();
    setWord("");

    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => {
        const data = response.data;
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error)
        alert(error)
      });
  };


  return (
    <div className="bg-white min-h-screen flex flex-col">
        <div className="p-8 flex flex-w flex-col absolute top-0 right-0 space-y-2 items-end">
            <button onClick={() => setAnswer(show => !show)} className='font-bold text-5xl'>?</button>
            {answer && <div className="flex flex-col bg-black text-white p-3 w-48 rounded-3xl">
                <p>If a blank screen shows up, just reload. That means the API protested.</p>
                </div>}
        </div>
        <div className="flex flex-col items-center space-y-8 p-8">
            <h1 className="text-5xl font-bold m-10">Serena's Dictionary App</h1>
            <form
                onSubmit={handleSearch}
                className="px-2 py-4 rounded-xl shadow-lg shadow-purple-900 w-96"
            >
                <div className="flex flex-col space-y-4 p-2">
                <label className="text-xl">🔎 Search For a Word:</label>
                <input
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    className="rounded-lg focus:outline-none px-2 py-1 border-2 border-purple-900"
                    autoFocus
                />
                <button type="submit" className="py-1 border-2 rounded-lg border-purple-900 hover:bg-purple-200 hover:border-purple-200">
                    Let's Go!
                </button>
                </div>
            </form>
            {data ? (
                <div className="w-96 min-w-2xl p-4 rounded-xl shadow-lg shadow-purple-900 flex flex-col space-y-2">
                    <div className="text-4xl font-semibold flex items-end space-x-3">
                        <Player url={data[0].phonetics[1].audio}/>
                        <h1>{data[0].word}</h1>
                    </div>
                <div className="flex flex-col space-y-2 px-12">
                    {data[0].meanings.map((element) => {
                        return (
                        <div>
                            <p className="font-semibold italic">{element.partOfSpeech}</p>
                            <p>Synonyms:</p>
                            <div className="flex flex-wrap space-x-1 space-y-1">{element.synonyms.map((element) => {
                                return <p className="border-2 border-purple-900 rounded-xl p-1">{element}</p>
                            })}</div>
                            <ul className="list-disc">
                                {element.definitions.map((element) => {
                                return <li className="text-lg">{element.definition}</li>;
                                })}
                            </ul>
                        </div>
                        )
                    })}
                </div>
                </div>
            ) : null}
      </div>
    </div>
  );
}

export default Dictionary;