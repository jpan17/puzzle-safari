import React, { useState } from 'react';


const pigpenLetters = [
  'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
];

const PigpenTool: React.FC = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('decode');
  const [typedPigpen, setTypedPigpen] = useState<string[]>([]);
  const [encodeInput, setEncodeInput] = useState('');

  const handleClick = (letter: string) => {
    setTypedPigpen([...typedPigpen, letter]);
  };

  const handleClear = () => {
    setTypedPigpen([]);
    setEncodeInput('');
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value as 'encode' | 'decode');
    handleClear();
  };

  const handleEncodeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEncodeInput(e.target.value);
  };

  return (
    <div className="pigpen-tool">
      <h2>Pigpen Cipher Encoder / Decoder</h2>
      <select value={mode} onChange={handleModeChange} style={{ marginBottom: 12 }}>
        <option value="decode">Decode (click images)</option>
        <option value="encode">Encode (type text)</option>
      </select>

      {mode === 'decode' ? (
        <>
          <div className="pigpen-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 12 }}>
            {pigpenLetters.map((letter) => (
              <button
                key={letter}
                className="pigpen-btn"
                onClick={() => handleClick(letter)}
                title={letter}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                <img
                  src={`/pigpenAlphabet/${letter}.png`}
                  alt={letter}
                  style={{ width: 40, height: 40, display: 'block', margin: '0 auto' }}
                />
                <div style={{ fontSize: '0.9rem', marginTop: 2, color: 'black' }}>{letter}</div>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <button onClick={handleClear} className="pigpen-clear">Clear</button>
          </div>
          <div style={{ marginTop: 16 }}>
            <strong>Pigpen Sequence:</strong>
            <span style={{ marginLeft: 8 }}>
              {typedPigpen.map((letter, i) => (
                <img
                  key={i}
                  src={`/pigpenAlphabet/${letter}.png`}
                  alt={letter}
                  style={{ width: 32, height: 32, verticalAlign: 'middle', marginRight: 2 }}
                />
              ))}
            </span>
          </div>
          <div style={{ marginTop: 16 }}>
            <strong>Output:</strong>
            <span style={{ marginLeft: 8 }}>{typedPigpen.join('')}</span>
          </div>
        </>
      ) : (
        <>
          <textarea
            value={encodeInput}
            onChange={handleEncodeInput}
            placeholder="Enter text to encode..."
            rows={3}
            style={{ width: '100%', marginBottom: 12 }}
          />
          <div style={{ marginTop: 16 }}>
            <strong>Pigpen Cipher:</strong>
            <span style={{ marginLeft: 8 }}>
              {encodeInput.toUpperCase().split('').map((char, i) =>
                pigpenLetters.includes(char) ? (
                  <img
                    key={i}
                    src={`/pigpenAlphabet/${char}.png`}
                    alt={char}
                    style={{ width: 32, height: 32, verticalAlign: 'middle', marginRight: 2 }}
                  />
                ) : (
                  <span key={i} style={{ marginRight: 2 }}>{char}</span>
                )
              )}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default PigpenTool;
