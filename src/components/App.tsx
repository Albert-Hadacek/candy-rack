import AppStateProvider from '../state/AppState'
import ProductPage from './ProductPage/ProductPage'

function App() {
  return (
    <AppStateProvider>
      <ProductPage />
    </AppStateProvider>
  )
}

export default App
