import { useState } from 'react'
import './App.css'
import AuthContainer from './containers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='App'>
     <AuthContainer/>
    </div>
    </>
  )
}

export default App
