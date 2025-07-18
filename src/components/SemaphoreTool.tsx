import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const semaphoreLetters = [
  'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',' '
];

const SemaphoreTool: React.FC = () => {
  const navigate = useNavigate();
  const [output, setOutput] = useState<string[]>([]);

  const handleClick = (letter: string) => {
    setOutput([...output, letter]);
  };

  const handleClear = () => {
    setOutput([]);
  };

  return (
    <div className="semaphore-tool" style={{ maxWidth: 480, margin: '32px auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: '#eee', color: '#222', border: 'none', borderRadius: 6, padding: '10px 24px', cursor: 'pointer', fontWeight: 500, fontSize: '1.08rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          ← Back to Puzzlehunt Toolkit
        </button>
      </div>
      <h2>Semaphore Input & Decoder</h2>
      <div className="semaphore-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 12 }}>
        {semaphoreLetters.map(letter =>
          letter === ' ' ? (
            <button
              key="space"
              className="semaphore-btn"
              onClick={() => handleClick(' ')}
              title="Space"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', minHeight: 40 }}
            >
              <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #bbb', borderRadius: 8, background: '#fafafa' }}>
                <span style={{ color: '#bbb', fontSize: 24 }}>&#9251;</span>
              </div>
              <div style={{ fontSize: '0.9rem', marginTop: 2, color: 'black' }}>Space</div>
            </button>
          ) : (
            <button
              key={letter}
              className="semaphore-btn"
              onClick={() => handleClick(letter)}
              title={letter}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <img
                src={`/semaphoreAlphabet/${letter}.png`}
                alt={letter}
                style={{ width: 40, height: 40, display: 'block', margin: '0 auto' }}
              />
              <div style={{ fontSize: '0.9rem', marginTop: 2, color: 'black' }}>{letter}</div>
            </button>
          )
        )}
      </div>
      <div style={{ marginBottom: 12 }}>
        <button
          onClick={handleClear}
          style={{ background: '#0078d4', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', cursor: 'pointer', fontWeight: 500, fontSize: '1rem', marginRight: 8 }}
        >
          Clear
        </button>
      </div>
      <div style={{ marginTop: 16 }}>
        <strong>Output:</strong>
        <div
          style={{
            marginTop: 8,
            minHeight: 32,
            background: '#f6f6f6',
            borderRadius: 6,
            padding: '10px 14px',
            fontSize: '1.18rem',
            fontFamily: 'monospace',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
            maxWidth: 420,
            overflowWrap: 'break-word',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {output.length > 0 ? (
            output.map((letter, idx) =>
              letter === ' ' ? (
                <span key={idx} style={{ width: 40, height: 40, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #bbb', borderRadius: 8, background: '#fafafa', color: '#bbb', fontSize: 24 }}>
                  &#9251;
                </span>
              ) : (
                <img
                  key={idx}
                  src={`/semaphoreAlphabet/${letter}.png`}
                  alt={letter}
                  style={{ width: 40, height: 40, display: 'inline-block' }}
                  title={letter}
                />
              )
            )
          ) : (
            <span style={{ color: '#aaa' }}>Click images to build your sequence…</span>
          )}
        </div>
        <div style={{ marginTop: 8, fontSize: '1.08rem', color: '#222' }}>
          {output.length > 0 ? output.join('') : ''}
        </div>
      </div>
    </div>
  );
};

export default SemaphoreTool;