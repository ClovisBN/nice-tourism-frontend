const defaultFontSize = "14px";
const defaultColor = "#000000";

export const applyOrRemoveFormat = (content, offsets, command, value) => {
  if (!Array.isArray(content)) return content;
  const { startOffset, endOffset } = offsets;
  let newContent = [...content];
  let currentIndex = 0;
  let shouldRemoveFormat = true;

  newContent.forEach((paragraphObj) => {
    paragraphObj.paragraph.forEach((item) => {
      const start = currentIndex;
      const end = currentIndex + item.content.length;
      if (startOffset < end && endOffset > start) {
        if (!item.formats.some((format) => format.command === command)) {
          shouldRemoveFormat = false;
        }
      }
      currentIndex = end;
    });
  });

  currentIndex = 0;

  newContent = newContent.map((paragraphObj) => {
    const updatedParagraph = paragraphObj.paragraph.flatMap((item) => {
      const start = currentIndex;
      const end = currentIndex + item.content.length;
      currentIndex = end;

      if (startOffset < end && endOffset > start) {
        const before = item.content.slice(0, Math.max(0, startOffset - start));
        const middle = item.content.slice(
          Math.max(0, startOffset - start),
          Math.min(item.content.length, endOffset - start)
        );
        const after = item.content.slice(
          Math.min(item.content.length, endOffset - start)
        );

        const result = [];
        if (before) result.push({ content: before, formats: item.formats });

        let newFormats;
        if (
          command === "fontSize" ||
          command === "color" ||
          command === "highlight"
        ) {
          newFormats = [
            ...item.formats.filter((format) => format.command !== command),
            { command, value },
          ];
        } else {
          newFormats = shouldRemoveFormat
            ? item.formats.filter((format) => format.command !== command)
            : [...item.formats, { command, value }];
        }

        if (newFormats.every((format) => format.command !== "fontSize")) {
          newFormats.push({ command: "fontSize", value: defaultFontSize });
        }
        if (newFormats.every((format) => format.command !== "color")) {
          newFormats.push({ command: "color", value: defaultColor });
        }

        result.push({ content: middle, formats: newFormats });

        if (after) result.push({ content: after, formats: item.formats });
        return result;
      } else {
        if (item.formats.every((format) => format.command !== "fontSize")) {
          item.formats.push({ command: "fontSize", value: defaultFontSize });
        }
        if (item.formats.every((format) => format.command !== "color")) {
          item.formats.push({ command: "color", value: defaultColor });
        }
        return item;
      }
    });
    return { paragraph: updatedParagraph };
  });

  return mergeAdjacentFormats(newContent);
};

const mergeAdjacentFormats = (content) => {
  return content.map((paragraphObj) => {
    const mergedContent = [];
    paragraphObj.paragraph.forEach((item) => {
      if (mergedContent.length === 0) {
        mergedContent.push(item);
      } else {
        const lastItem = mergedContent[mergedContent.length - 1];
        if (JSON.stringify(lastItem.formats) === JSON.stringify(item.formats)) {
          lastItem.content += item.content;
        } else {
          mergedContent.push(item);
        }
      }
    });
    return { paragraph: mergedContent };
  });
};
