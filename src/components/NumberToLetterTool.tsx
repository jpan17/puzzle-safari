import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function numberToLetter(input: string): string {
  // Supports numbers separated by space, comma, or newline
  return input
    .split(/[\s,]+/)
    .map(num => {
      const n = parseInt(num, 10);
      if (isNaN(n)) return '';
      // 1 = A, 2 = B, ..., 26 = Z
      if (n >= 1 && n <= 26) return String.fromCharCode(64 + n);
      return '';
    })
    .join('');
}

function letterToNumber(input: string): string {
  // Converts letters to numbers (A=1, B=2, ..., Z=26)
  return input
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .map(char => (char.charCodeAt(0) - 64).toString())
    .join(' ');
}

const NumberToLetterTool: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('decode');

  useEffect(() => {
    if (mode === 'decode') {
      setOutput(numberToLetter(input));
    } else {
      setOutput(letterToNumber(input));
    }
  }, [input, mode]);

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value as 'encode' | 'decode');
    setInput('');
    setOutput('');
  };

  return (
    <div className="number-to-letter-tool" style={{ maxWidth: 480, margin: '32px auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: '#eee', color: '#222', border: 'none', borderRadius: 6, padding: '10px 24px', cursor: 'pointer', fontWeight: 500, fontSize: '1.08rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          ← Back to Puzzlehunt Toolkit
        </button>
      </div>
      <h2>Number ↔ Letter Converter</h2>
      <select value={mode} onChange={handleModeChange} style={{ marginBottom: 12 }}>
        <option value="decode">Decode (numbers → letters)</option>
        <option value="encode">Encode (letters → numbers)</option>
      </select>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={
          mode === 'decode'
            ? 'Enter numbers (e.g. 1 2 3 or 8,5,12,12,15)'
            : 'Enter letters (e.g. HELLO)'
        }
        rows={5}
        style={{ width: '100%', marginBottom: 12, fontSize: '1.08rem', borderRadius: 6, border: '1px solid #ccc', padding: 8 }}
      />
      <div style={{ marginTop: 16 }}>
        <strong>Output:</strong>
        <div style={{ marginTop: 8, background: '#f6f6f6', borderRadius: 6, padding: '10px 14px', fontSize: '1.18rem', fontFamily: 'monospace', wordBreak: 'break-word', whiteSpace: 'pre-wrap', minHeight: 32 }}>
          {output || <span style={{ color: '#aaa' }}>Result will appear here…</span>}
        </div>
      </div>
    </div>
  );
};

export default NumberToLetterTool;