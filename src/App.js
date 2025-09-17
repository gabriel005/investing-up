import React, { useEffect, useState } from "react";
import AssetTable from "./components/AssetTable";
import AssetDetails from "./components/AssetDetails";
import SearchBar from "./components/SearchBar";
import assetsData from "./data/assets.json";
import "./styles/App.scss";

function App() {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    setAssets(assetsData);
  }, []);

  const filteredAssets = assets.filter((asset) =>
    asset.Ativos.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 className="title">INVESTIDOR DE SUCESSO</h1>
      {!selectedAsset && (
        <>
          <SearchBar onSearch={setSearchTerm} />
          <AssetTable assets={filteredAssets} onSelect={setSelectedAsset} />
        </>
      )}
      {selectedAsset && (
        <AssetDetails asset={selectedAsset} onBack={() => setSelectedAsset(null)} />
      )}
    </div>
  );
}

export default App;