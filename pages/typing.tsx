import React, { useState, useEffect, useRef } from 'react';
// import * as cornify from '../utils/cornify';
import { conditionalClasses, wait } from '../utils/helpers';
import { keysList } from '../utils/keys';
import { rainbowColors } from '../utils/rainbowColors';
import { words } from '../utils/wordsList';
import gsap from 'gsap';

export default function Typing() {
  const [highlightedKeyCode, setHighlightedKeyCode] = useState(['']);
  const [wordPos, setWordPos] = useState(0); // Current Word Index
  const [wordExploded, setWordExploded] = useState(words[0].split('')); // Current Word Broken
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const rainbowTopRef = useRef<any>('');
  const rainbowLeftRef = useRef<any>('');

  async function launchTopRainbow() {
    if (rainbowTopRef.current) {
      setIsAnimating(true);
      const elArr = [...rainbowTopRef.current?.children];

      await gsap.to(elArr, {
        height: '100%',
        ease: 'power4.out',
        stagger: 0.2,
      });

      setIsAnimating(false);
    }
  }

  async function launchLeftRainbow() {
    if (rainbowLeftRef.current) {
      setIsAnimating(true);
      const elArr = [...rainbowLeftRef.current?.children];

      await gsap.to(elArr, {
        width: '100%',
        ease: 'power4.out',
        stagger: 0.2,
      });

      setIsAnimating(false);
    }
  }

  useEffect(() => {
    function updatePosition() {
      if (wordPos === words.length - 1) {
        setWordPos(0);
      } else {
        setWordPos((prev) => prev + 1);
      }
    }

    function onKeyDown(e: any) {
      if (isAnimating) return;
      setHighlightedKeyCode((prev) => [...prev, e.code]);
    }

    function onKeyUp(e: any) {
      if (isAnimating) return;
      setHighlightedKeyCode((prev) =>
        prev.filter((item) => item.toLowerCase() !== e.code.toLowerCase())
      );
      if (
        e.key.toLowerCase() === wordExploded[currentLetterIndex].toLowerCase()
      ) {
        if (wordExploded.length - 1 !== currentLetterIndex)
          setCurrentLetterIndex((prev) => prev + 1);
        else {
          if (wordPos % 2 === 0) {
            launchTopRainbow();
          } else {
            launchLeftRainbow();
          }
          updatePosition();
        }
      }
    }

    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [currentLetterIndex, isAnimating, wordExploded, wordPos]);

  // Update Word
  useEffect(() => {
    // Get array of letters for current word
    setWordExploded(words[wordPos].split(''));
    // Reset current letter index
    setCurrentLetterIndex(0);
  }, [wordPos]);

  return (
    <div className="bg-pink-50 position-relative pyro">
      <div className="before"></div>
      <div className="after"></div>
      <div
        style={{ maxWidth: '1480px' }}
        className="h-vh-100 flex-center gap-sm mx-auto z-100 position-relative"
      >
        <div className="h2 typing__word">
          {wordExploded.map((letter, index) => (
            <span
              style={
                {
                  '--letter-color':
                    rainbowColors[
                      index < rainbowColors.length - 1
                        ? index
                        : Math.floor(Math.random() * rainbowColors.length)
                    ],
                } as React.CSSProperties
              }
              key={letter + index}
              className={`typing__word__letter ${conditionalClasses([
                currentLetterIndex === index,
                'active',
              ])}`}
            >
              {letter}
            </span>
          ))}
        </div>
        {keysList.map((row, i) => (
          <div className="d-flex gap-sm w-100" key={i}>
            {row.map(({ char, size, code }, index) => (
              <div
                style={{ width: '80px', height: '80px', flexBasis: '80px' }}
                className={`border-rounded bg-purple flex-center gap-sm box-shadow text-lg  ${conditionalClasses(
                  [size === 'sm', 'flex-1'],
                  [size === 'md', 'flex-2'],
                  [size === 'lg', 'flex-3'],
                  [size === 'xl', 'flex-4'],
                  [
                    // highlightedKeyCode.toLowerCase() === code.toLowerCase(),
                    highlightedKeyCode.some(
                      (item) => item.toLowerCase() === code.toLowerCase()
                    ),
                    'active bg-purple-light',
                  ],
                  [
                    wordExploded[currentLetterIndex].toLowerCase() ===
                      char.toLowerCase(),
                    'typing__key--highlighted',
                  ]
                )}`}
                key={char + index}
              >
                <p className="font-weight-900">{char}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        className="position-fixed top-0 left-0 w-vw-100 h-vh-100 d-flex z-9"
        ref={rainbowTopRef}
      >
        {rainbowColors.map((color, i, arr) => (
          <span
            key={color + i}
            style={{
              backgroundColor: color,
              width: `${100 / arr.length}%`,
              height: '0%',
            }}
          ></span>
        ))}
      </div>
      <div
        className="position-fixed top-0 left-0 w-vw-100 h-vh-100 d-flex z-10 flex-col"
        ref={rainbowLeftRef}
      >
        {rainbowColors.map((color, i, arr) => (
          <span
            key={color + i}
            style={{
              backgroundColor: color,
              width: '0%',
              height: `${100 / arr.length}%`,
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}
