import './App.css'
import GameScreen from './screens/Game'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center p-4">
      <h1 className='text-2xl font-bold text-blue-500 mb-2 mt-2 text-center'>Cuatro en línea</h1>
      <GameScreen />
    </div>
  )
}

export default App
