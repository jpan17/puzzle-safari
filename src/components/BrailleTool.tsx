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

const brailleKeys = Object.entries(brailleMap);

function decodeBraille(braille: string[]): string {
  return braille.map(code => reverseBrailleMap[code] || '?').join('');
}

const BrailleTool: React.FC = () => {
  const [typedBraille, setTypedBraille] = useState<string[]>([]);

  const handleClick = (code: string) => {
    setTypedBraille([...typedBraille, code]);
  };

  const handleClear = () => {
    setTypedBraille([]);
  };

  const output = decodeBraille(typedBraille);

  return (
    <div className="braille-tool">
      <h2>Braille Input & Decoder</h2>
      <div className="braille-grid">
        {brailleKeys.map(([char, code]) => (
          <button
            key={char}
            className="braille-btn"
            onClick={() => handleClick(code)}
            title={char}
          >
            <span style={{ fontSize: '2rem' }}>{code}</span>
            <div style={{ fontSize: '0.9rem', marginTop: 2 }}>{char}</div>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <button onClick={handleClear} className="braille-clear">Clear</button>
      </div>
      <div style={{ marginTop: 16 }}>
        <strong>Braille Sequence:</strong>
        <span style={{ fontSize: '2rem', marginLeft: 8 }}>
          {typedBraille.map((code, i) => (
            <span key={i}>{code}</span>
          ))}
        </span>
      </div>
      <div style={{ marginTop: 16 }}>
        <strong>Output:</strong>
        <span style={{ marginLeft: 8 }}>{output}</span>
      </div>
    </div>
  );
};

export default BrailleTool;
