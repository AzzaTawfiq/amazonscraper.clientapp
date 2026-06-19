import { Routes, Route } from "react-router-dom";
import ApiDataGrid from './search.tsx'
import ProductDetailsPage from './productDetails.tsx'
import ProductOffersPage from "./productOffers.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ApiDataGrid />} />
      <Route
        path="/productDetails/:asin"
        element={<ProductDetailsPage />}
      />
       <Route
        path="/productOffers/:asin"
        element={<ProductOffersPage />}
      />
    </Routes>
  );
}

export default App;

