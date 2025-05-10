import './App.css'
import GameContainer from './components/layout/GameContainer'

function App() {
  return (
    <div className="h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-700 flex flex-col items-center justify-between p-4 overflow-hidden">
      <GameContainer />
    </div>
  )
}

export default App
