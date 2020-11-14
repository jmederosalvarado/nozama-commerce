import "../styles/tailwind.css";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import AuthMenu from "../components/auth/menu";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-700 pb-8">
      <Provider store={store}>
        <Component {...pageProps} />
        <AuthMenu />
      </Provider>
    </div>
  );
};

export default App;
