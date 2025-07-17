import React, { useState } from 'react';

// Braille Unicode patterns for A-Z, 0-9
const brailleMap: Record<string, string> = {
  A: '\u2801', B: '\u2803', C: '\u2809', D: '\u2819', E: '\u2811',
  F: '\u280B', G: '\u281B', H: '\u2813', I: '\u280A', J: '\u281A',
  K: '\u2805', L: '\u2807', M: '\u280D', N: '\u281D', O: '\u2815',
  P: '\u280F', Q: '\u281F', R: '\u2817', S: '\u280E', T: '\u281E',
  U: '\u2825', V: '\u2827', W: '\u283A', X: '\u282D', Y: '\u283D', Z: '\u2835',
  1: '\u2801', 2: '\u2803', 3: '\u2809', 4: '\u2819', 5: '\u2811',
  6: '\u280B', 7: '\u281B', 8: '\u2813', 9: '\u280A', 0: '\u281A',
};

const reverseBrailleMap: Record<string, string> = Object.fromEntries(
  Object.entries(brailleMap).map(([k, v]) => [v, k])
);

const brailleKeys = [...Object.entries(brailleMap), [' ', ' ']];

function decodeBraille(braille: string[]): string {
  return braille.map(code => reverseBrailleMap[code] || '?').join('');
}

const BrailleTool: React.FC = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('decode');
  const [typedBraille, setTypedBraille] = useState<string[]>([]);
  const [encodeInput, setEncodeInput] = useState('');

  const handleClick = (code: string) => {
    setTypedBraille([...typedBraille, code]);
  };

  const handleClear = () => {
    setTypedBraille([]);
    setEncodeInput('');
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value as 'encode' | 'decode');
    handleClear();
  };

  const handleEncodeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEncodeInput(e.target.value);
  };

  const output = decodeBraille(typedBraille);

  return (
    <div className="braille-tool">
      <h2>Braille Encoder / Decoder</h2>
      <select value={mode} onChange={handleModeChange} style={{ marginBottom: 12 }}>
        <option value="decode">Decode (click symbols)</option>
        <option value="encode">Encode (type text)</option>
      </select>

      {mode === 'decode' ? (
        <>
          <div className="braille-grid">
            {brailleKeys.map(([char, code]) => (
              char === ' ' ? (
                <button
                  key="space"
                  className="braille-btn"
                  onClick={() => handleClick(' ')}
                  title="Space"
                  style={{ minHeight: 40 }}
                >
                  <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #bbb', borderRadius: 8, background: '#fafafa' }}>
                    <span style={{ color: '#bbb', fontSize: 24 }}>&#9251;</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', marginTop: 2 }}>Space</div>
                </button>
              ) : (
                <button
                  key={char}
                  className="braille-btn"
                  onClick={() => handleClick(code)}
                  title={char}
                >
                  <span style={{ fontSize: '2rem' }}>{code}</span>
                  <div style={{ fontSize: '0.9rem', marginTop: 2 }}>{char}</div>
                </button>
              )
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <button onClick={handleClear} className="braille-clear">Clear</button>
          </div>
          <div style={{ marginTop: 16 }}>
            <strong>Braille Sequence:</strong>
            <span
              style={{
                fontSize: '2rem',
                marginLeft: 8,
                display: 'inline-block',
                maxWidth: '100%',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                verticalAlign: 'middle',
              }}
            >
              {typedBraille.map((code, i) => (
                code === ' ' ? (
                  <span key={i} style={{ display: 'inline-block', width: 32, height: 32, verticalAlign: 'middle', marginRight: 2 }}>&#9251;</span>
                ) : (
                  <span key={i}>{code}</span>
                )
              ))}
            </span>
          </div>
          <div style={{ marginTop: 16 }}>
            <strong>Output:</strong>
            <span style={{ marginLeft: 8 }}>{output}</span>
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
            <strong>Braille:</strong>
            <span
              style={{
                fontSize: '2rem',
                marginLeft: 8,
                display: 'inline-block',
                maxWidth: '100%',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                verticalAlign: 'middle',
              }}
            >
              {encodeInput.toUpperCase().split('').map((char, i) =>
                brailleMap[char] ? (
                  <span key={i}>{brailleMap[char]}</span>
                ) : (
                  <span key={i} style={{ color: '#aaa' }}>{char}</span>
                )
              )}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default BrailleTool;
