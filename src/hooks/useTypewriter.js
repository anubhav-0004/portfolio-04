"use client";
import { useState, useEffect } from "react";

export function useTypewriter(words, speed = 80, deleteSpeed = 50, pause = 2000) {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWord];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(word.slice(0, currentText.length + 1));
        if (currentText.length + 1 === word.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setCurrentText(word.slice(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWord((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWord, words, speed, deleteSpeed, pause]);

  return currentText;
}