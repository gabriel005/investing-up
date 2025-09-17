import React, { useState } from "react";
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

function AssetTable({ assets, onSelect }) {
  const [sortField, setSortField] = useState("DY Atual");
  const [sortOrder, setSortOrder] = useState("desc");

  // Função para alternar campo e ordem de ordenação
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Ordena os ativos conforme o campo e ordem
  const sortedAssets = [...assets].sort((a, b) => {
    const aValue = a[sortField] || 0;
    const bValue = b[sortField] || 0;
    if (sortOrder === "asc") {
      return aValue - bValue;
    }
    return bValue - aValue;
  });

  if (!assets || assets.length === 0) {
    return <p className="asset-table-container">Nenhum ativo encontrado.</p>;
  }

  return (
    <div className="asset-table-container">
      <table className="asset-table">
        <thead>
          <tr>
            <th>ATIVOS</th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleSort(SORT_FIELDS.DY)}
            >
              DY ATUAL
              {sortField === SORT_FIELDS.DY ? (sortOrder === "asc" ? " ▼" : " ▲") : ""}
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleSort(SORT_FIELDS.PVP)}
            >
              PVP
              {sortField === SORT_FIELDS.PVP ? (sortOrder === "asc" ? " ▼" : " ▲") : ""}
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleSort(SORT_FIELDS.LIQUIDEZ)}
            >
              LIQUIDEZ DIÁRIA
              {sortField === SORT_FIELDS.LIQUIDEZ ? (sortOrder === "asc" ? " ▼" : " ▲") : ""}
            </th>
            <th>SETOR</th>
          </tr>
        </thead>
        <tbody>
          {sortedAssets.map((asset, index) => (
            <tr key={index} style={{ cursor: "pointer" }} onClick={() => onSelect(asset)}>
              <td>{asset.Ativos || ''}</td>
              <td>{asset["DY Atual"] || ''}</td>
              <td>{asset.PVP || ''}</td>
              <td>{formatLiquidez(asset["Liquidez diária"])}</td>
              <td>{asset.Setor || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssetTable;