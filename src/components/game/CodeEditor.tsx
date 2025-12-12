import Editor from '@monaco-editor/react';
import { useState } from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  readOnly?: boolean;
}

export function CodeEditor({ code, onChange, readOnly = false }: CodeEditorProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden border border-primary/20">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-card">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-muted-foreground font-code text-sm">
              Loading magical editor...
            </span>
          </div>
        </div>
      )}
      
      <Editor
        height="100%"
        defaultLanguage="csharp"
        theme="vs-dark"
        value={code}
        onChange={(value) => onChange(value || '')}
        onMount={() => setIsLoaded(true)}
        options={{
          readOnly,
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          minimap: { enabled: false },
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          tabSize: 4,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          smoothScrolling: true,
          contextmenu: false,
          folding: true,
          bracketPairColorization: { enabled: true },
          suggest: { showKeywords: true },
        }}
      />
    </div>
  );
}
