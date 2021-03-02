import '../styles/globals.css'
import { Provider } from 'react-redux'
import { configureStore } from "../redux/store";

function MyApp({ Component, pageProps }) {
  const store = configureStore();
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )}

export default MyApp
