"use client";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
} from "react";

interface AddressInput {
  value: string;
  onChange: (value: string) => void;
  title: string;
  hasGolem: boolean;
}

export const AddressInput = ({
  value,
  onChange,
  title,
  hasGolem,
}: AddressInput) => {
  const [addressChars, setAddressChars] = useState<(string | null)[]>(
    Array(40).fill(null)
  );
  const [placeholderAddress, setPlaceholderAddress] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [charCount, setCharCount] = useState<number>(0);

  useEffect(() => {
    generateRandomPlaceholder();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [cursorPosition]);

  useEffect(() => {
    const nonNullChars = addressChars.filter((char) => char !== null);
    setCharCount(nonNullChars.length);
    const a = addressChars.map((char) => char ?? "X");
    onChange(a.join(""));
  }, [addressChars, onChange]);

  const generateRandomPlaceholder = () => {
    const randomAddr = Array(40)
      .fill(0)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");
    setPlaceholderAddress(randomAddr);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (cursorPosition === 40) return;
    const inputValue = e.target.value.toLowerCase().replace(/[^0-9a-fX]/g, "");
    if (inputValue == "") return;
    const newPosition = e.target.selectionStart ?? 0;
    setAddressChars((prev) => {
      const newChars = [...prev];
      if (newPosition > cursorPosition) {
        newChars[cursorPosition] = inputValue[cursorPosition];
      } else if (newPosition < cursorPosition) {
        newChars[cursorPosition - 1] = null;
      }
      return newChars;
    });
    setCursorPosition(newPosition);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const symbols = [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "+",
      "-",
      "=",
      "[",
      "{",
      "]",
      "}",
      "\\",
      "|",
      ";",
      ":",
      "'",
      '"',
      ",",
      "<",
      ".",
      ">",
      "/",
      "?",
      "`",
      "~",

      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",

      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    if (
      symbols.includes(e.key) ||
      (charCount >= (hasGolem ? 10 : 8) && e.key !== "Backspace")
    ) {
      e.preventDefault();
    }
    if (e.key === "Backspace" && cursorPosition > 0) {
      e.preventDefault();
      setAddressChars((prev) => {
        const newChars = [...prev];
        newChars[cursorPosition - 1] = null;
        return newChars;
      });
      setCursorPosition((prev) => prev - 1);
    } else if (e.key === "ArrowLeft" && cursorPosition > 0) {
      e.preventDefault();
      setCursorPosition((prev) => prev - 1);
    } else if (e.key === "ArrowRight" && cursorPosition < 40) {
      e.preventDefault();
      setCursorPosition((prev) => prev + 1);
    }
  };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    setCursorPosition(e.currentTarget.selectionStart ?? 0);
  };

  const displayValue = addressChars
    .map((char, index) => char || placeholderAddress[index])
    .join("");

  return (
    <div className="w-full">
      <label
        htmlFor="address"
        className="block text-blue-400 text-sm font-mono font-bold mb-2"
      >
        PATTERN:
      </label>

      <div className="relative font-mono text-base bg-gray-700 border rounded-md border-blue-500 focus:border-blue-400 focus:ring-blue-700">
        <input
          ref={inputRef}
          type="text"
          id="address"
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-transparent relative z-10 caret-transparent"
          spellCheck="false"
        />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-2 flex">
          {addressChars.map((char, index) => (
            <span
              key={index}
              className={`relative ${
                char !== null ? "text-blue-400" : "text-gray-400"
              }`}
            >
              {char !== null ? char : placeholderAddress[index]}
              {isFocused && index === cursorPosition && (
                <span className="absolute inset-0 bg-white opacity-50 animate-blink"></span>
              )}
            </span>
          ))}

          <span className={`relative text-gray-400`}>
            {cursorPosition === 40 ? " " : ""}
            <span className="absolute inset-0 bg-white opacity-50 animate-blink"></span>
          </span>
        </div>
      </div>
      <span className="text-blue-400 text-sm font-mono">
        {charCount}/{hasGolem ? "10" : "8"} characters
      </span>
    </div>
  );
};
