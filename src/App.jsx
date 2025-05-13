import './App.css'
import AppLayout from './components/layout/AppLayout'
import { GameProvider } from './context/GameContext'

function App() {
  return (
    <div className="h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-700 flex flex-col items-center justify-between p-4 overflow-hidden">
      <GameProvider>
        <AppLayout />
      </GameProvider>
    </div>
  )
}

export default App
