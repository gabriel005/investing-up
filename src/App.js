import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";
import AssetTable from "./components/AssetTable";
import AssetDetails from "./components/AssetDetails";
import SearchBar from "./components/SearchBar";
import assetsData from "./data/assets.json";
import "./styles/App.scss";

function Home({ assets, setSearchTerm, filteredAssets }) {
  return (
    <>
      <SearchBar onSearch={setSearchTerm} />
      <AssetTable assets={filteredAssets} />
    </>
  );
}

function AssetPage({ assets }) {
  const { id } = useParams(); // pega o ativo da URL
  const navigate = useNavigate();

  const asset = assets.find((a) => a.Ativos === id);

  if (!asset) {
    return <p>Ativo não encontrado.</p>;
  }

  return (
    <AssetDetails asset={asset} onBack={() => navigate(-1)} />
  );
}

function App() {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setAssets(assetsData);
  }, []);

  const filteredAssets = assets.filter(
    (asset) =>
      asset.Ativos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.Setor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="app-container">
        <h1 className="title">INVESTIDOR DE SUCESSO</h1>
        <Routes>
          <Route
            path="/"
            element={<Home assets={assets} setSearchTerm={setSearchTerm} filteredAssets={filteredAssets} />}
          />
          <Route
            path="/asset/:id"
            element={<AssetPage assets={assets} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
