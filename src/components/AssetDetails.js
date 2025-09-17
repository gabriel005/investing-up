import React, { useState } from "react";
import "../styles/AssetDetails.scss";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


const periods = [
  { label: "1 Dia", value: "1d" },
  { label: "7 Dias", value: "7d" },
  { label: "1 Mês", value: "1m" },
  { label: "6 Meses", value: "6m" },
  { label: "1 Ano", value: "1y" },
  { label: "5 Anos", value: "5y" },
  { label: "10 Anos", value: "10y" }
];

function AssetDetails({ asset }) {
  const [period, setPeriod] = useState("1d");

  if (!asset) return null;

  return (
    <div className="asset-details-container">
      <div className="asset-details-left">
        {/* <button className="asset-details-back-btn" onClick={onBack}>
          Voltar
        </button> */}
        <table className="asset-details-table">
          <thead>
            <tr>
              <th colSpan="2">{asset.Ativos}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DY Atual</td>
              <td>{asset["DY Atual"] || "-"}</td>
            </tr>
            <tr>
              <td>PVP</td>
              <td>{asset.PVP || "-"}</td>
            </tr>
            <tr>
              <td>Liquidez diária</td>
              <td>{asset["Liquidez diária"] || "-"}</td>
            </tr>
            <tr>
              <td>Setor</td>
              <td>{asset.Setor || "-"}</td>
            </tr>
            <tr>
              <td>ROE</td>
              <td>{asset.ROE || "-"}</td>
            </tr>
            <tr>
              <td>ROIC</td>
              <td>{asset.ROIC || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="asset-details-chart">
        <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
          {periods.map((p) => (
            <button
              key={p.value}
              style={{
                padding: "6px 16px",
                borderRadius: "6px",
                border: period === p.value ? "2px solid #1976d2" : "1px solid #ccc",
                background: period === p.value ? "#e3f2fd" : "#fff",
                cursor: "pointer",
                fontWeight: period === p.value ? "bold" : "normal"
              }}
              onClick={() => setPeriod(p.value)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={asset.chartData ? asset.chartData[period] : []}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AssetDetails;