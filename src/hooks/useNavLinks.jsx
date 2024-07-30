// src/hooks/useNavLinks.jsx
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const useNavLinks = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [widths, setWidths] = useState([]);
  const [left, setLeft] = useState(0);
  const location = useLocation();
  const linksRef = useRef([]);

  useEffect(() => {
    const currentIndex = linksRef.current.findIndex(
      (link) => link && link.pathname === location.pathname
    );
    setActiveIndex(currentIndex);
  }, [location]);

  useEffect(() => {
    const newWidths = linksRef.current.map((link) =>
      link ? link.offsetWidth : 0
    );
    setWidths(newWidths);

    const newLeft = linksRef.current
      .slice(0, activeIndex)
      .reduce((acc, link) => acc + (link ? link.offsetWidth : 0), 0);
    setLeft(newLeft);
  }, [activeIndex, location.pathname]);

  return { linksRef, activeIndex, widths, left };
};

export default useNavLinks;
