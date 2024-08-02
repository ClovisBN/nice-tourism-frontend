// src/components/RichTextEditor.jsx
import React, { useState, useRef } from "react";
import "./RichTextEditor.css";
import Editor from "./Editor";
import Toolbar from "./Toolbar";
import ColorPicker from "./ColorPicker";
import { applyOrRemoveFormat } from "./formats";

const App = () => {
  const [content, setContent] = useState([
    {
      paragraph: [
        {
          content:
            "Un certain nombre de variantes ont été développées par des tiers afin de pallier ce qui était perçu comme des limitations du langage originel.",
          formats: [],
        },
      ],
    },
  ]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const editorRef = useRef(null);

  const getSelectionOffsets = () => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return null;

    const range = selection.getRangeAt(0);
    let startOffset = range.startOffset;
    let endOffset = range.endOffset;
    let currentOffset = 0;
    let isWithinRange = false;

    const traverseNodes = (node) => {
      if (node === range.startContainer) {
        startOffset += currentOffset;
        isWithinRange = true;
      }

      if (isWithinRange && node === range.endContainer) {
        endOffset += currentOffset;
        isWithinRange = false;
      }

      if (node.nodeType === Node.TEXT_NODE) {
        currentOffset += node.textContent.length;
      } else {
        node.childNodes.forEach(traverseNodes);
      }
    };

    document.querySelector(".editor").childNodes.forEach(traverseNodes);

    return { startOffset, endOffset };
  };

  const handleInput = (newContent) => {
    if (!Array.isArray(newContent)) {
      newContent = [
        {
          paragraph: [
            {
              content: newContent,
              formats: [
                { command: "fontSize", value: "14px" },
                { command: "color", value: "#000000" },
              ],
            },
          ],
        },
      ];
    }
    setContent(newContent);
  };

  const handleFormat = (command, value) => {
    console.log(`Applying format: ${command} with value: ${value}`);
    const offsets = getSelectionOffsets();
    if (offsets) {
      const newContent = applyOrRemoveFormat(content, offsets, command, value);
      handleInput(newContent);
    }
  };

  const handleOpenColorPicker = () => {
    setShowColorPicker(true);
  };

  const handleOpenHighlightPicker = () => {
    setShowHighlightPicker(true);
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };

  const handleCloseHighlightPicker = () => {
    setShowHighlightPicker(false);
  };

  const handleSelectColor = (color, isHighlight) => {
    handleFormat(isHighlight ? "highlight" : "color", color);
    setShowColorPicker(false);
    setShowHighlightPicker(false);
  };

  return (
    <div className="App">
      <Toolbar
        onFormat={handleFormat}
        onOpenColorPicker={handleOpenColorPicker}
        onOpenHighlightPicker={handleOpenHighlightPicker}
      />
      <Editor ref={editorRef} content={content} onInput={handleInput} />
      <button onClick={() => console.log(content)}>Log JSON</button>
      {showColorPicker && (
        <ColorPicker
          onSelectColor={handleSelectColor}
          onClose={handleCloseColorPicker}
          isHighlight={false}
        />
      )}
      {showHighlightPicker && (
        <ColorPicker
          onSelectColor={handleSelectColor}
          onClose={handleCloseHighlightPicker}
          isHighlight={true}
        />
      )}
    </div>
  );
};

export default App;
