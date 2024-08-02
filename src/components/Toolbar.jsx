// src/components/Toolbar.js
import React from "react";

const Toolbar = ({ onFormat, onOpenColorPicker, onOpenHighlightPicker }) => {
  return (
    <div className="toolbar">
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          onFormat("bold");
        }}
      >
        Bold
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          onFormat("italic");
        }}
      >
        Italic
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          onFormat("underline");
        }}
      >
        Underline
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          onFormat("strikeThrough");
        }}
      >
        StrikeThrough
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          onOpenColorPicker();
        }}
      >
        Text Color
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          onOpenHighlightPicker();
        }}
      >
        Highlight
      </button>
      <select
        onMouseDown={(e) => e.preventDefault()}
        onChange={(e) => {
          onFormat("fontSize", e.target.value);
        }}
      >
        <option value="12px">12</option>
        <option value="14px">14</option>
        <option value="16px">16</option>
        <option value="18px">18</option>
        <option value="20px">20</option>
        <option value="24px">24</option>
        <option value="28px">28</option>
        <option value="32px">32</option>
        <option value="36px">36</option>
        <option value="40px">40</option>
      </select>
    </div>
  );
};

export default Toolbar;
