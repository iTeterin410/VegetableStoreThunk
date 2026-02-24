import { BasketProvider } from './context/BasketContext';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

function App() {
  return (
    <BasketProvider>
      <Header />
      <Main />
    </BasketProvider>
  );
}

export default App;