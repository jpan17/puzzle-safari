import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const morseMap: Record<string, string> = {
  A: '.-',    B: '-...',  C: '-.-.',  D: '-..',   E: '.',
  F: '..-.',  G: '--.',   H: '....',  I: '..',    J: '.---',
  K: '-.-',   L: '.-..',  M: '--',    N: '-.',    O: '---',
  P: '.--.',  Q: '--.-',  R: '.-.',   S: '...',   T: '-',
  U: '..-',   V: '...-',  W: '.--',   X: '-..-',  Y: '-.--',
  Z: '--..',
  0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-',
  5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
  ' ': '/',
};

const reverseMorseMap: Record<string, string> = Object.fromEntries(
  Object.entries(morseMap).map(([k, v]) => [v, k])
);

function encodeMorse(text: string): string {
  return text
    .toUpperCase()
    .split('')
    .map(char => morseMap[char] || '')
    .filter(Boolean)
    .join(' ');
}

function decodeMorse(morse: string): string {
  return morse
    .split(' ')
    .map(code => reverseMorseMap[code] || '')
    .join('');
}

const MorseTool: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [output, setOutput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value as 'encode' | 'decode');
    setOutput('');
    setInput('');
  };

  const handleConvert = () => {
    if (mode === 'encode') {
      setOutput(encodeMorse(input));
    } else {
      setOutput(decodeMorse(input));
    }
  };

  return (
    <div className="morse-tool">
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: '#eee', color: '#222', border: 'none', borderRadius: 6, padding: '10px 24px', cursor: 'pointer', fontWeight: 500, fontSize: '1.08rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          ← Back to Puzzlehunt Toolkit
        </button>
      </div>
      <h2>Morse Code Encoder / Decoder</h2>
      <select value={mode} onChange={handleModeChange}>
        <option value="encode">Encode</option>
        <option value="decode">Decode</option>
      </select>
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Morse code to decode...'}
        rows={4}
        style={{ width: '100%', marginTop: 8 }}
      />
      <button onClick={handleConvert} style={{ marginTop: 8 }}>
        Convert
      </button>
      <div style={{ marginTop: 16 }}>
        <strong>Output:</strong>
        <div style={{ whiteSpace: 'pre-wrap', marginTop: 4 }}>{output}</div>
      </div>
    </div>
  );
};

export default MorseTool;
