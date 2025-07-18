import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function caesarShift(text: string, shift: number) {
  return text.replace(/[a-z]/gi, (char) => {
    const base = char >= 'a' && char <= 'z' ? 97 : 65;
    return String.fromCharCode(
      ((char.charCodeAt(0) - base + shift + 26) % 26) + base
    );
  });
}

const CaesarTool: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [wordSet, setWordSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/words.txt')
      .then(res => res.text())
      .then(text => {
        setWordSet(new Set(text.split(/\r?\n/).map(w => w.toLowerCase())));
      });
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInput(e.target.value);
  }

  function handleMode(e: React.ChangeEvent<HTMLSelectElement>) {
    setMode(e.target.value as 'encode' | 'decode');
  }

  const shifts = Array.from({ length: 26 }, (_, i) => i);

  function isDictionaryWord(word: string) {
    // Checks if a word matches any dictionary word, treating '?' as a wildcard for any letter
    const w = word.toLowerCase();
    if (!w.includes('?')) return wordSet.has(w);
    return wordSet.has(word.toLowerCase());
  }

  // For multi-word input, check if all words in the output are dictionary words
  function isAllWordsDictionary(output: string) {
    const words = output.split(/\s+/).filter(Boolean);
    return words.length > 0 && words.every(isDictionaryWord);
  }

  return (
    <div className="tool-page">
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: '#eee', color: '#222', border: 'none', borderRadius: 6, padding: '10px 24px', cursor: 'pointer', fontWeight: 500, fontSize: '1.08rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          ← Back to Puzzlehunt Toolkit
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
        <div className="caesar-sidebar" style={{ minWidth: 320, maxHeight: 400, overflowY: 'auto', background: '#f6f6f6', borderRadius: 8, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {shifts.map(shift => {
              const output = input ? caesarShift(input, mode === 'encode' ? shift : -shift) : '';
              const isWord = output && isDictionaryWord(output);
              const isAllWords = output && isAllWordsDictionary(output);
              return (
                <li key={shift} style={{ marginBottom: 8 }}>
                  <strong style={{ fontSize: '0.95em' }}>Shift {shift}:</strong>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.92em',
                      background: isAllWords ? '#e6ffe6' : isWord ? '#e6ffe6' : '#fff',
                      borderRadius: 4,
                      padding: '2px 6px',
                      marginTop: 2,
                      wordBreak: 'break-word',
                      maxWidth: 360,
                      border: isAllWords ? '2px solid #2ecc40' : isWord ? '2px solid #2ecc40' : '1px solid #eee',
                      color: isAllWords ? '#228B22' : isWord ? '#228B22' : undefined,
                    }}
                  >
                    {input ? output : <span style={{ color: '#aaa' }}>—</span>}
                    {!isAllWords && isWord && <span style={{ marginLeft: 8, fontWeight: 600, color: '#228B22' }}>✔</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <h2>Caesar Cipher Tool</h2>
          <form className="caesar-form" style={{ marginBottom: 16 }}>
            <label>
              Text:
              {(() => {
                // Find the best shift (if any) where all output words are dictionary words
                let highlight = false;
                if (input) {
                  for (let shift = 0; shift < 26; shift++) {
                    const output = caesarShift(input, mode === 'encode' ? shift : -shift);
                    if (isAllWordsDictionary(output)) {
                      highlight = true;
                      break;
                    }
                  }
                }
                return (
                  <textarea
                    value={input}
                    onChange={handleChange}
                    rows={3}
                    style={{
                      width: '100%',
                      marginBottom: 8,
                      background: highlight ? '#e6ffe6' : undefined,
                      border: highlight ? '2px solid #2ecc40' : undefined,
                    }}
                  />
                );
              })()}
            </label>
            <label style={{ marginLeft: 16 }}>
              Mode:
              <select value={mode} onChange={handleMode} style={{ marginLeft: 8 }}>
                <option value="encode">Encode</option>
                <option value="decode">Decode</option>
              </select>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CaesarTool;
