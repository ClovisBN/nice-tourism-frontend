// src/components/ColorPicker.js
import React from "react";
import "./ColorPicker.css";

// Définir les couleurs pour chaque ligne
const colors = [
  [
    "#000000",
    "#1C1C1C",
    "#383838",
    "#555555",
    "#717171",
    "#8D8D8D",
    "#AAAAAA",
    "#C6C6C6",
    "#E2E2E2",
    "#FFFFFF",
  ], // Dégradé noir à blanc
  [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#9400D3",
    "#FF1493",
    "#00CED1",
    "#FFD700",
  ], // Couleurs de base
  [
    "#FFC1C1",
    "#FFD8B1",
    "#FFFFCC",
    "#CCFFCC",
    "#CCCCFF",
    "#D1C4E9",
    "#E1BEE7",
    "#FFDDC1",
    "#AFEEEE",
    "#FFF8DC",
  ], // Version claire
  [
    "#FF8A8A",
    "#FFB380",
    "#FFFF99",
    "#99FF99",
    "#9999FF",
    "#B39DDB",
    "#CE93D8",
    "#FFAB91",
    "#76D7C4",
    "#FFE4B5",
  ], // Version légèrement plus sombre
  [
    "#FF4545",
    "#FF9933",
    "#FFFF66",
    "#66FF66",
    "#6666FF",
    "#9575CD",
    "#BA68C8",
    "#FF8A65",
    "#48C9B0",
    "#FFDAB9",
  ], // Version encore plus sombre
  [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#9400D3",
    "#FF1493",
    "#00CED1",
    "#FFD700",
  ], // Un peu plus sombre
  [
    "#E60000",
    "#E67300",
    "#E6E600",
    "#00E600",
    "#0000E6",
    "#3A0061",
    "#800080",
    "#E0115F",
    "#00A5A5",
    "#FFC700",
  ], // Encore plus sombre
  [
    "#B30000",
    "#B35A00",
    "#B3B300",
    "#00B300",
    "#0000B3",
    "#2D004B",
    "#660066",
    "#B10DC9",
    "#008B8B",
    "#FFB700",
  ], // Le plus sombre
];

const ColorPicker = ({ onSelectColor, onClose, isHighlight }) => {
  return (
    <div className="color-picker" onMouseDown={(e) => e.preventDefault()}>
      <div className="color-columns">
        {Array.from({ length: colors[0].length }, (_, colIndex) => (
          <div key={colIndex} className="color-column">
            {colors.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="color-swatch"
                style={{ backgroundColor: row[colIndex] }}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSelectColor(row[colIndex], isHighlight)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <button onMouseDown={(e) => e.preventDefault()} onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ColorPicker;
