import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import "./index.css";
import App from "./App";
import BookDetails from "./components/BookDetails";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/books" />} />
      <Route path="/books" element={<App />}>
        <Route path=":bookId" element={<BookDetails />} />
      </Route>
      <Route
      path="*"
      element={
        <main id="not-found">
          <p>404</p>
        </main>
      }
    />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();