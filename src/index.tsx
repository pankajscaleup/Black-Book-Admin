import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { persistedStore, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistedStore}>
      <Toaster
        toastOptions={{
          className: "hot-toast",
          duration: 5000,
          success: {
            duration: 4000,
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            duration: 6000,
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
