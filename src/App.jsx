import './App.css'
import GameScreen from './screens/Game'

function App() {
  return (
    <div className="h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-700 flex flex-col items-center justify-between p-4">
      <h1 className='text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 mt-4 text-center'>Konect4</h1>
      <GameScreen />
    </div>
  )
}

export default App
