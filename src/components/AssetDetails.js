import React, { useState } from "react";
import "../styles/AssetDetails.scss";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Exemplo de dados fictícios para diferentes períodos
const chartData = {
  "1d": [
    { time: "09:00", value: 12.1 },
    { time: "10:00", value: 12.3 },
    { time: "11:00", value: 12.2 },
    { time: "12:00", value: 12.4 }
  ],
  "7d": [
    { time: "Seg", value: 12.1 },
    { time: "Ter", value: 12.3 },
    { time: "Qua", value: 12.2 },
    { time: "Qui", value: 12.4 },
    { time: "Sex", value: 12.5 },
    { time: "Sáb", value: 12.6 },
    { time: "Dom", value: 12.7 }
  ],
  "1m": [
    { time: "01/06", value: 12.1 },
    { time: "07/06", value: 12.3 },
    { time: "14/06", value: 12.2 },
    { time: "21/06", value: 12.4 },
    { time: "28/06", value: 12.5 }
  ],
  "6m": [
    { time: "Jan", value: 12.1 },
    { time: "Fev", value: 12.3 },
    { time: "Mar", value: 12.2 },
    { time: "Abr", value: 12.4 },
    { time: "Mai", value: 12.5 },
    { time: "Jun", value: 12.6 }
  ],
  "1y": [
    { time: "2024", value: 12.1 },
    { time: "2025", value: 12.3 }
  ],
  "5y": [
    { time: "2021", value: 11.1 },
    { time: "2022", value: 11.5 },
    { time: "2023", value: 12.0 },
    { time: "2024", value: 12.3 },
    { time: "2025", value: 12.7 }
  ],
  "10y": [
    { time: "2016", value: 10.1 },
    { time: "2018", value: 10.8 },
    { time: "2020", value: 11.5 },
    { time: "2022", value: 12.0 },
    { time: "2024", value: 12.3 }
  ]
};

const periods = [
  { label: "1 Dia", value: "1d" },
  { label: "7 Dias", value: "7d" },
  { label: "1 Mês", value: "1m" },
  { label: "6 Meses", value: "6m" },
  { label: "1 Ano", value: "1y" },
  { label: "5 Anos", value: "5y" },
  { label: "10 Anos", value: "10y" }
];

function AssetDetails({ asset, onBack }) {
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