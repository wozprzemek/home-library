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
import FormWindow from "./components/FormWindow";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/edit/:bookId" element={<FormWindow />} name="edit" />
      </Route>
      <Route path="/details/:bookId" element={<BookDetails />} name="details"/>
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