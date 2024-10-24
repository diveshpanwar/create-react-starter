import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center items-center space-x-8 my-8">
        <a href="https://vitejs.dev" target="_blank" className="transition-transform transform hover:scale-110">
          <img src={viteLogo} className="w-16 h-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="transition-transform transform hover:scale-110">
          <img src={reactLogo} className="w-16 h-16" alt="React logo" />
        </a>
      </div>

      <h1 className="text-4xl font-bold text-center mb-6">Vite + React</h1>

      <div className="card flex flex-col items-center p-8 bg-white shadow-lg rounded-lg">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-colors hover:bg-blue-700"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <p className="mt-4 text-gray-700">
          Edit <code className="bg-gray-200 p-1 rounded">src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="text-center text-gray-500 mt-8">
        Click on the Vite and React logos to learn more
      </p>

      <div className="flex justify-center mt-6">
        <img
          alt="Generated Using create-app-using-react"
          src="https://img.shields.io/badge/Generated-create--app--using--react-Green?style=for-the-badge"
          className="shadow-lg"
        />
      </div>
    </>
  );
}

export default App;
