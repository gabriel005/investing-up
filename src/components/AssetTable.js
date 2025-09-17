import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 hook para navegação
import "../styles/AssetTable.scss";

function formatLiquidez(valor) {
  if (typeof valor !== "number") return valor;
  if (valor >= 1000000) return (valor / 1000000).toFixed(2) + " M";
  if (valor >= 1000) return (valor / 1000).toFixed(2) + " K";
  return valor.toString();
}

const SORT_FIELDS = {
  DY: "DY Atual",
  PVP: "PVP",
  LIQUIDEZ: "Liquidez diária"
};

function AssetTable({ assets }) {
  const navigate = useNavigate(); // 🔥 instanciando hook
  const [sortField, setSortField] = useState("DY Atual");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedAssets = [...assets].sort((a, b) => {
    const aValue = a[sortField] || 0;
    const bValue = b[sortField] || 0;
    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  if (!assets || assets.length === 0) {
    return <p className="asset-table-container-nothing">Nenhum ativo encontrado.</p>;
  }

  return (
    <div className="asset-table-container">
      <table className="asset-table">
        <thead>
          <tr>
            <th>ATIVOS</th>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort(SORT_FIELDS.DY)}>
              DY ATUAL {sortField === SORT_FIELDS.DY ? (sortOrder === "asc" ? " ▼" : " ▲") : ""}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort(SORT_FIELDS.PVP)}>
              PVP {sortField === SORT_FIELDS.PVP ? (sortOrder === "asc" ? " ▼" : " ▲") : ""}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort(SORT_FIELDS.LIQUIDEZ)}>
              LIQUIDEZ DIÁRIA {sortField === SORT_FIELDS.LIQUIDEZ ? (sortOrder === "asc" ? " ▼" : " ▲") : ""}
            </th>
            <th>SETOR</th>
          </tr>
        </thead>
        <tbody>
          {sortedAssets.map((asset, index) => (
            <tr
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/asset/${asset.Ativos}`)} // 🔥 navega clicando na linha
            >
              <td>{asset.Ativos || ""}</td>
              <td>{asset["DY Atual"] || ""}</td>
              <td>{asset.PVP || ""}</td>
              <td>{formatLiquidez(asset["Liquidez diária"])}</td>
              <td>{asset.Setor || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssetTable;
