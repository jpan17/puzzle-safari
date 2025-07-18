import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function getAnagrams(input: string, wordSet: Set<string>): string[] {
  // Track original input and positions of capitalized letters
  const raw = input.replace(/[^a-zA-Z?]/g, '');
  const letters = raw.toLowerCase().split('');
  if (!letters.length) return [];
  // Find positions of capitalized letters
  const caps: Record<number, string> = {};
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] >= 'A' && raw[i] <= 'Z') {
      caps[i] = raw[i].toLowerCase();
    }
  }
  const results: Set<string> = new Set();
  wordSet.forEach(word => {
    if (word.length !== letters.length) return;
    // Capitalized letter constraint
    for (const pos in caps) {
      if (word[Number(pos)] !== caps[pos]) return;
    }
    const wordArr = word.split('');
    const lettersCopy = [...letters];
    for (let i = 0; i < wordArr.length; i++) {
      const char = wordArr[i];
      // Try to match char to a letter or a '?'
      let idx = lettersCopy.indexOf(char);
      if (idx === -1) {
        idx = lettersCopy.indexOf('?');
        if (idx === -1) return;
      }
      lettersCopy.splice(idx, 1);
    }
    results.add(word);
  });
  return Array.from(results);
}

const AnagramTool: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [wordSet, setWordSet] = useState<Set<string>>(new Set());
  const [anagrams, setAnagrams] = useState<string[]>([]);

  useEffect(() => {
    fetch('/words.txt')
      .then(res => res.text())
      .then(text => {
        setWordSet(new Set(text.split(/\r?\n/).map(w => w.toLowerCase())));
      });
  }, []);

  useEffect(() => {
    if (input && wordSet.size) {
      setAnagrams(getAnagrams(input, wordSet));
    } else {
      setAnagrams([]);
    }
  }, [input, wordSet]);

  return (
    <div className="anagram-tool">
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: '#eee', color: '#222', border: 'none', borderRadius: 6, padding: '10px 24px', cursor: 'pointer', fontWeight: 500, fontSize: '1.08rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          ← Back to Puzzlehunt Toolkit
        </button>
      </div>
      <h2>Anagram Solver</h2>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter letters. Use '?' for wildcards. Capital letters must be in the same position."
        rows={4}
        style={{ width: '98%', minWidth: 420, maxWidth: 700, marginBottom: 16, fontSize: '1.15rem', borderRadius: 6, border: '1px solid #ccc', padding: 12 }}
      />
      <div style={{ marginTop: 16 }}>
        <strong>Possible Anagrams:</strong>
        <div style={{ marginTop: 8, minHeight: 32 }}>
          {anagrams.length > 0 ? (
            <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
              {anagrams.map(word => (
                <li key={word} style={{ display: 'inline-block', marginRight: 12, marginBottom: 8, background: '#f6f6f6', borderRadius: 6, padding: '6px 14px', fontSize: '1.08rem', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>{word}</li>
              ))}
            </ul>
          ) : (
            <span style={{ color: '#aaa' }}>No anagrams found.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnagramTool;
