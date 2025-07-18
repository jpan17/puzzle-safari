import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function encodeBase2(input: string): string {
  return input
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

function decodeBase2(input: string): string {
  return input
    .split(/\s+/)
    .map(bin => {
      const n = parseInt(bin, 2);
      return isNaN(n) ? '' : String.fromCharCode(n);
    })
    .join('');
}

const Base2Tool: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  useEffect(() => {
    if (mode === 'encode') {
      setOutput(encodeBase2(input));
    } else {
      setOutput(decodeBase2(input));
    }
  }, [input, mode]);

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value as 'encode' | 'decode');
    setInput('');
    setOutput('');
  };

  return (
    <div className="base2-tool" style={{ maxWidth: 480, margin: '32px auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: '#eee', color: '#222', border: 'none', borderRadius: 6, padding: '10px 24px', cursor: 'pointer', fontWeight: 500, fontSize: '1.08rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          ← Back to Puzzlehunt Toolkit
        </button>
      </div>
      <h2>Base 2 (Binary) Encoder / Decoder</h2>
      <select value={mode} onChange={handleModeChange} style={{ marginBottom: 12 }}>
        <option value="encode">Encode (text → binary)</option>
        <option value="decode">Decode (binary → text)</option>
      </select>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={
          mode === 'encode'
            ? 'Enter text to encode (e.g. HELLO)'
            : 'Enter binary (space-separated, e.g. 01001000 01000101)'
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

export default Base2Tool;