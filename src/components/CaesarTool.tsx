import React, { useState } from 'react';

function caesarShift(text: string, shift: number) {
  return text.replace(/[a-z]/gi, (char) => {
    const base = char >= 'a' && char <= 'z' ? 97 : 65;
    return String.fromCharCode(
      ((char.charCodeAt(0) - base + shift + 26) % 26) + base
    );
  });
}

const CaesarTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInput(e.target.value);
  }

  function handleMode(e: React.ChangeEvent<HTMLSelectElement>) {
    setMode(e.target.value as 'encode' | 'decode');
  }

  const shifts = Array.from({ length: 26 }, (_, i) => i);

  return (
    <div className="tool-page" style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
      <div className="caesar-sidebar" style={{ minWidth: 320, maxHeight: 400, overflowY: 'auto', background: '#f6f6f6', borderRadius: 8, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {shifts.map(shift => (
            <li key={shift} style={{ marginBottom: 8 }}>
              <strong style={{ fontSize: '0.95em' }}>Shift {shift}:</strong>
              <div style={{ fontFamily: 'monospace', fontSize: '0.92em', background: '#fff', borderRadius: 4, padding: '2px 6px', marginTop: 2, wordBreak: 'break-word', maxWidth: 360 }}>
                {input ? caesarShift(input, mode === 'encode' ? shift : -shift) : <span style={{ color: '#aaa' }}>—</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        <h2>Caesar Cipher Tool</h2>
        <form className="caesar-form" style={{ marginBottom: 16 }}>
          <label>
            Text:
            <textarea value={input} onChange={handleChange} rows={3} style={{ width: '100%', marginBottom: 8 }} />
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
  );
};

export default CaesarTool;
