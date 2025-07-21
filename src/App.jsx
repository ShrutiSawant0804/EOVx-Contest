import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductListingPage from './components/ProductListingPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProductListingPage/>
    </>
  )
}

export default App
