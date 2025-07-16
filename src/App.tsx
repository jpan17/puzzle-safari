import BrailleTool from './components/BrailleTool';

// ...existing code...
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MorseTool from './components/MorseTool';
import './App.css';

const tools = [
  {
    name: '🔤 Caesar Cipher',
    description: 'Solve Caesar ciphers.',
    path: '/caesar',
  },
  {
    name: '📡 Morse Code',
    description: 'Encode and decode Morse code.',
    path: '/morse',
  },
  {
    name: '🤚 Braille',
    description: 'Encode and decode Braille.',
    path: '/braille',
  },
  {
    name: '🐷 Pigpen Cipher',
    description: 'Encode and decode Pigpen cipher.',
    path: '/pigpen',
  },
  {
    name: '🔀 Anagram Solver',
    description: 'Find anagrams for your clues.',
    path: '/anagram',
  },
  {
    name: '🚩 Semaphore',
    description: 'Decode semaphore flag signals.',
    path: '/semaphore',
  },
  {
    name: '⚓ Maritime Flags',
    description: 'Decode international maritime signal flags.',
    path: '/maritime',
  },
];

function Dashboard() {
  return (
    <div className="dashboard">
      <h1> 🧩 Puzzle Safari Tools</h1>
      <div className="tool-grid">
        {tools.map(tool => (
          <Link to={tool.path} className="tool-card" key={tool.name}>
            <h2>{tool.name}</h2>
            <p>{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';

function caesarShift(text: string, shift: number) {
  return text.replace(/[a-z]/gi, (char) => {
    const base = char >= 'a' && char <= 'z' ? 97 : 65;
    return String.fromCharCode(
      ((char.charCodeAt(0) - base + shift + 26) % 26) + base
    );
  });
}

function CaesarTool() {
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
}
function PigpenTool() {
  return <div><h2>Pigpen Cipher Tool</h2><p>Encode and decode Pigpen cipher here.</p></div>;
}
function AnagramTool() {
  return <div><h2>Anagram Solver</h2><p>Find anagrams for your clues here.</p></div>;
}
function SemaphoreTool() {
  return <div><h2>Semaphore Tool</h2><p>Decode semaphore flag signals here.</p></div>;
}
function MaritimeTool() {
  return <div><h2>Maritime Flags Tool</h2><p>Decode international maritime signal flags here.</p></div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/caesar" element={<CaesarTool />} />
        <Route path="/morse" element={<MorseTool />} />
        <Route path="/braille" element={<BrailleTool />} />
        <Route path="/pigpen" element={<PigpenTool />} />
        <Route path="/anagram" element={<AnagramTool />} />
        <Route path="/semaphore" element={<SemaphoreTool />} />
        <Route path="/maritime" element={<MaritimeTool />} />
      </Routes>
    </Router>
  );
}

export default App;
