// ...existing code...
// ...existing code...
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

// ...existing code...

// ...existing code...

// ...existing code...
import CaesarTool from './components/CaesarTool';
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
