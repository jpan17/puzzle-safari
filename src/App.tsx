import PigpenTool from './components/PigpenTool';
import BrailleTool from './components/BrailleTool';
import MorseTool from './components/MorseTool';
import CaesarTool from './components/CaesarTool';
import AnagramTool from './components/AnagramTool';
import SemaphoreTool from './components/SemaphoreTool';
import MaritimeTool from './components/MaritimeTool';
import Base2Tool from './components/Base2Tool';
import NumberToLetterTool from './components/NumberToLetterTool';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
  {
    name: '💾 Base 2 (Binary)',
    description: 'Encode and decode text in binary.',
    path: '/base2',
  },
  {
    name: '🔢 Number to Letter',
    description: 'Convert numbers (1=A, 2=B, ...) to letters.',
    path: '/number-to-letter',
  },
];

function Dashboard() {
  return (
    <div className="dashboard">
      <h1> 🧩 Puzzle Hunt Tools</h1>
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
        <Route path="/base2" element={<Base2Tool />} />
        <Route path="/number-to-letter" element={<NumberToLetterTool />} />
      </Routes>
    </Router>
  );
}

export default App;
