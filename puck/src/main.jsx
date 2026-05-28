import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Puck, Render } from '@measured/puck';
import '@measured/puck/puck.css';
import './style.css';
import { config, initialData } from './puck.config.jsx';

const STORAGE_KEY = 'accordia-puck-lab-data';

function loadData() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialData;
  } catch {
    return initialData;
  }
}

function App() {
  const [mode, setMode] = useState('editor');
  const [data, setData] = useState(loadData);

  const exportedJson = useMemo(() => JSON.stringify(data, null, 2), [data]);

  function handlePublish(nextData) {
    setData(nextData);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
  }

  if (mode === 'preview') {
    return (
      <div className="accordia-lab-shell">
        <div className="accordia-lab-toolbar">
          <strong>Accordia Puck Lab</strong>
          <button onClick={() => setMode('editor')}>Torna all'editor</button>
        </div>
        <Render config={config} data={data} />
      </div>
    );
  }

  if (mode === 'json') {
    return (
      <div className="accordia-lab-shell accordia-lab-json">
        <div className="accordia-lab-toolbar">
          <strong>JSON pagina</strong>
          <button onClick={() => setMode('editor')}>Torna all'editor</button>
        </div>
        <pre>{exportedJson}</pre>
      </div>
    );
  }

  return (
    <div className="accordia-lab-editor">
      <div className="accordia-lab-toolbar">
        <strong>Accordia Puck Lab</strong>
        <div>
          <button onClick={() => setMode('preview')}>Anteprima</button>
          <button onClick={() => setMode('json')}>Vedi JSON</button>
        </div>
      </div>
      <Puck config={config} data={data} onPublish={handlePublish} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
