import { useState, useEffect } from "react";

export function useTypewriter(words, speed = 80, deleteSpeed = 50, pause = 2000) {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  useEffect(() => {
    if (isPausing) return;

    const word = words[currentWord];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = word.slice(0, currentText.length + 1);
        setCurrentText(next);

        if (next === word) {
          setIsPausing(true);
          setTimeout(() => {
            setIsPausing(false);
            setIsDeleting(true);
          }, pause);
        }
      } else {
        const next = word.slice(0, currentText.length - 1);
        setCurrentText(next);

        if (next === "") {
          setIsDeleting(false);
          setCurrentWord((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPausing, currentWord, words, speed, deleteSpeed, pause]);

  return currentText;
}