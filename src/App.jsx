import './App.css'
import GameScreen from './screens/Game'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-700 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
        <h1 className='text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 mb-4 text-center'>Conecta 4</h1>
        <GameScreen />
      </div>
    </div>
  )
}

export default App
