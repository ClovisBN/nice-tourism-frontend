import React, { useRef, useEffect, forwardRef, useCallback } from "react";

const Editor = forwardRef(({ content, onInput }, ref) => {
  const editorRef = useRef(null);
  const savedSelection = useRef({ paragraphIndex: 0, offset: 0 });

  useEffect(() => {
    if (ref) ref.current = editorRef.current;
  }, [ref]);

  const saveSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      let currentOffset = 0;
      let found = false;

      content.forEach((paragraphObj, pIndex) => {
        if (found) return;
        paragraphObj.paragraph.forEach((item) => {
          if (found) return;
          const node = editorRef.current.childNodes[pIndex]?.childNodes[0];
          if (node && range.startContainer === node.firstChild) {
            savedSelection.current = {
              paragraphIndex: pIndex,
              offset: range.startOffset + currentOffset,
            };
            found = true;
          }
          currentOffset += item.content.length;
        });
      });

      console.log("Saved Selection Range:", savedSelection.current);
    }
  }, [content]);

  const restoreSelection = useCallback(() => {
    const { paragraphIndex, offset } = savedSelection.current;
    if (paragraphIndex >= content.length) {
      console.warn("Invalid paragraphIndex, resetting to 0");
      savedSelection.current.paragraphIndex = 0;
      savedSelection.current.offset = 0;
      return;
    }

    let currentOffset = 0;
    let found = false;

    const range = document.createRange();
    const selection = window.getSelection();
    selection.removeAllRanges();

    const paragraph = content[paragraphIndex]?.paragraph || [];

    paragraph.forEach((item) => {
      if (found) return;
      if (
        offset >= currentOffset &&
        offset <= currentOffset + item.content.length
      ) {
        const node =
          editorRef.current.childNodes[paragraphIndex]?.childNodes[0];
        if (node) {
          range.setStart(node.firstChild, offset - currentOffset);
          found = true;
        }
      }
      currentOffset += item.content.length;
    });

    if (found) {
      range.collapse(true);
      selection.addRange(range);
      console.log("Restored Selection Range:", { paragraphIndex, offset });
    }
  }, [content]);

  useEffect(() => {
    const renderContent = () => {
      const editor = editorRef.current;
      editor.innerHTML = "";
      content.forEach((paragraphObj) => {
        const div = document.createElement("div");
        paragraphObj.paragraph.forEach((item) => {
          const span = document.createElement("span");
          item.formats.forEach((format) => {
            if (format.command === "bold") span.style.fontWeight = "bold";
            if (format.command === "italic") span.style.fontStyle = "italic";
            if (format.command === "underline")
              span.style.textDecoration = "underline";
            if (format.command === "strikeThrough")
              span.style.textDecoration = "line-through";
            if (format.command === "highlight")
              span.style.backgroundColor = format.value;
            if (format.command === "color") span.style.color = format.value;
            if (format.command === "fontSize")
              span.style.fontSize = format.value;
          });
          span.style.display = "block";
          span.style.height = span.style.fontSize || "14px";
          span.textContent = item.content || "\u200B"; // Ensure non-empty content
          div.appendChild(span);
        });
        editor.appendChild(div);
      });
    };
    renderContent();
    restoreSelection();
  }, [content, restoreSelection]);

  const handleInput = () => {
    saveSelection();
    const newContent = Array.from(editorRef.current.childNodes).map((div) => {
      const paragraph = Array.from(div.childNodes).map((node) => {
        const formats = [];
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.style.fontWeight === "bold")
            formats.push({ command: "bold", value: true });
          if (node.style.fontStyle === "italic")
            formats.push({ command: "italic", value: true });
          if (node.style.textDecoration.includes("underline"))
            formats.push({ command: "underline", value: true });
          if (node.style.textDecoration.includes("line-through"))
            formats.push({ command: "strikeThrough", value: true });
          if (node.style.backgroundColor)
            formats.push({
              command: "highlight",
              value: node.style.backgroundColor,
            });
          if (node.style.color)
            formats.push({ command: "color", value: node.style.color });
          if (node.style.fontSize)
            formats.push({ command: "fontSize", value: node.style.fontSize });
          return { content: node.textContent.trim(), formats }; // Ensure trimmed content
        }
        return { content: node.textContent.trim(), formats: [] };
      });
      return { paragraph };
    });
    console.log("New Content:", newContent);
    onInput(newContent);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { paragraphIndex, offset } = savedSelection.current;
      const newContent = JSON.parse(JSON.stringify(content)); // Clone the content to avoid direct mutation
      const currentParagraph = newContent[paragraphIndex]?.paragraph || [];

      if (offset === 0) {
        // If cursor is at the beginning of the paragraph
        newContent.splice(paragraphIndex, 0, {
          paragraph: [
            {
              content: "\u200B",
              formats: [{ command: "fontSize", value: "14px" }],
            },
          ],
        });
      } else if (
        offset ===
        currentParagraph.reduce((acc, item) => acc + item.content.length, 0)
      ) {
        // If cursor is at the end of the paragraph
        newContent.splice(paragraphIndex + 1, 0, {
          paragraph: [
            {
              content: "\u200B",
              formats: [{ command: "fontSize", value: "14px" }],
            },
          ],
        });
      } else {
        let startOffset = 0;
        const textBeforeCursor = [];
        const textAfterCursor = [];

        currentParagraph.forEach((item) => {
          if (startOffset + item.content.length <= offset) {
            textBeforeCursor.push(item);
          } else if (startOffset >= offset) {
            textAfterCursor.push(item);
          } else {
            textBeforeCursor.push({
              content: item.content.slice(0, offset - startOffset),
              formats: item.formats,
            });
            textAfterCursor.push({
              content: item.content.slice(offset - startOffset),
              formats: item.formats,
            });
          }
          startOffset += item.content.length;
        });

        newContent[paragraphIndex].paragraph = textBeforeCursor;
        newContent.splice(paragraphIndex + 1, 0, {
          paragraph: textAfterCursor,
        });
      }

      onInput(newContent);

      savedSelection.current = {
        paragraphIndex: paragraphIndex + 1,
        offset: 0,
      };
      restoreSelection();
      saveSelection(); // Save the new cursor position
    }

    if (e.key === "Backspace") {
      const { paragraphIndex, offset } = savedSelection.current;
      if (offset === 0 && paragraphIndex > 0) {
        const newContent = JSON.parse(JSON.stringify(content));
        newContent.splice(paragraphIndex, 1);
        onInput(newContent);
        savedSelection.current = {
          paragraphIndex: paragraphIndex - 1,
          offset:
            newContent[paragraphIndex - 1]?.paragraph.reduce(
              (acc, item) => acc + item.content.length,
              0
            ) || 0,
        };
        restoreSelection();
      }
    }
  };

  return (
    <div
      ref={editorRef}
      className="editor"
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onKeyUp={saveSelection}
      onMouseUp={saveSelection}
      onKeyDown={handleKeyDown}
    ></div>
  );
});

export default Editor;
