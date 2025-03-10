import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Provider } from "react-redux";
import { store } from "./store/store.tsx";
import { ToastContainer } from "react-toastify";
// import { createUploadLink } from "apollo-upload-client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

// export const client = new ApolloClient({
//   uri: "http://localhost:1212/graphql",
//   cache: new InMemoryCache(),
// });

const link = createUploadLink({
  // uri: "http://localhost:1211/graphql",
  uri: "https://filpkart-gn4q.onrender.com/graphql",
  credentials: "include",
});
export const client = new ApolloClient({
  // link: createUploadLink({ uri: "http://localhost:1212/graphql" }), // This enables file uploads
  link,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Provider>
    </ApolloProvider>
  </StrictMode>
);
