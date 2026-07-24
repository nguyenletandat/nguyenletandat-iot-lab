import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';

/**
 * Professional Arduino/C++ Code Editor using Monaco (VS Code engine)
 * Features: Syntax Highlighting, Autocomplete, Line Numbers, Bracket Matching
 */

// Arduino built-in function completions
const ARDUINO_COMPLETIONS = [
  // Digital I/O
  { label: 'pinMode', insertText: 'pinMode(${1:pin}, ${2|INPUT,OUTPUT,INPUT_PULLUP|});', detail: 'Set pin mode' },
  { label: 'digitalWrite', insertText: 'digitalWrite(${1:pin}, ${2|HIGH,LOW|});', detail: 'Write digital value' },
  { label: 'digitalRead', insertText: 'digitalRead(${1:pin})', detail: 'Read digital value' },
  // Analog I/O
  { label: 'analogRead', insertText: 'analogRead(${1:pin})', detail: 'Read analog value (0-1023)' },
  { label: 'analogWrite', insertText: 'analogWrite(${1:pin}, ${2:value});', detail: 'Write PWM value (0-255)' },
  // Time
  { label: 'delay', insertText: 'delay(${1:milliseconds});', detail: 'Pause execution' },
  { label: 'delayMicroseconds', insertText: 'delayMicroseconds(${1:us});', detail: 'Microsecond delay' },
  { label: 'millis', insertText: 'millis()', detail: 'Milliseconds since start' },
  { label: 'micros', insertText: 'micros()', detail: 'Microseconds since start' },
  // Serial
  { label: 'Serial.begin', insertText: 'Serial.begin(${1:115200});', detail: 'Init serial communication' },
  { label: 'Serial.println', insertText: 'Serial.println(${1:value});', detail: 'Print with newline' },
  { label: 'Serial.print', insertText: 'Serial.print(${1:value});', detail: 'Print without newline' },
  { label: 'Serial.available', insertText: 'Serial.available()', detail: 'Check for serial data' },
  { label: 'Serial.read', insertText: 'Serial.read()', detail: 'Read serial byte' },
  // Tone
  { label: 'tone', insertText: 'tone(${1:pin}, ${2:frequency}, ${3:duration});', detail: 'Generate tone' },
  { label: 'noTone', insertText: 'noTone(${1:pin});', detail: 'Stop tone' },
  // Advanced
  { label: 'pulseIn', insertText: 'pulseIn(${1:pin}, ${2|HIGH,LOW|})', detail: 'Measure pulse duration' },
  { label: 'map', insertText: 'map(${1:value}, ${2:fromLow}, ${3:fromHigh}, ${4:toLow}, ${5:toHigh})', detail: 'Map value range' },
  { label: 'constrain', insertText: 'constrain(${1:value}, ${2:low}, ${3:high})', detail: 'Constrain value' },
  // Structure
  { label: 'setup', insertText: 'void setup() {\n  ${1}\n}', detail: 'Setup function' },
  { label: 'loop', insertText: 'void loop() {\n  ${1}\n}', detail: 'Loop function' },
  // Defines
  { label: '#define', insertText: '#define ${1:NAME} ${2:value}', detail: 'Define constant' },
  { label: '#include', insertText: '#include <${1:library}.h>', detail: 'Include library' },
  // Libraries
  { label: 'Servo', insertText: 'Servo ${1:servoName};', detail: 'Servo motor object' },
  { label: 'LiquidCrystal_I2C', insertText: 'LiquidCrystal_I2C lcd(${1:0x27}, ${2:16}, ${3:2});', detail: 'LCD I2C object' },
];

export default function CodeEditor({ code, onChange, isSimulating, isDarkMode }) {
  const editorRef = useRef(null);

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;

    // Register Arduino/C++ autocomplete provider
    monaco.languages.registerCompletionItemProvider('cpp', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: word.endColumn,
        };

        return {
          suggestions: ARDUINO_COMPLETIONS.map(item => ({
            label: item.label,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: item.insertText,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: item.detail,
            range,
          })),
        };
      },
    });

    // Define custom theme
    monaco.editor.defineTheme('iot-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
      ],
      colors: {
        'editor.background': '#090C15',
        'editor.foreground': '#C9D1D9',
        'editorLineNumber.foreground': '#3B4257',
        'editorLineNumber.activeForeground': '#7C85A0',
        'editor.selectionBackground': '#264F78',
        'editor.lineHighlightBackground': '#0D1222',
        'editorCursor.foreground': '#10B981',
        'editorBracketMatch.background': '#264F78',
        'editorBracketMatch.border': '#2563EB',
      },
    });

    monaco.editor.defineTheme('iot-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '0000FF' },
        { token: 'string', foreground: 'A31515' },
        { token: 'number', foreground: '098658' },
      ],
      colors: {
        'editor.background': '#FFFFFF',
        'editor.foreground': '#1E293B',
        'editorLineNumber.foreground': '#94A3B8',
        'editor.selectionBackground': '#ADD6FF',
        'editor.lineHighlightBackground': '#F1F5F9',
        'editorCursor.foreground': '#059669',
      },
    });

    editor.updateOptions({ theme: isDarkMode ? 'iot-dark' : 'iot-light' });
  };

  return (
    <Editor
      height="100%"
      defaultLanguage="cpp"
      value={code}
      onChange={(value) => onChange(value || '')}
      onMount={handleEditorMount}
      theme={isDarkMode ? 'iot-dark' : 'iot-light'}
      options={{
        fontSize: 13,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontLigatures: true,
        lineNumbers: 'on',
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        tabSize: 2,
        automaticLayout: true,
        readOnly: isSimulating,
        bracketPairColorization: { enabled: true },
        guides: { bracketPairs: true, indentation: true },
        suggest: { showSnippets: true, showWords: true },
        quickSuggestions: true,
        parameterHints: { enabled: true },
        folding: true,
        glyphMargin: false,
        renderLineHighlight: 'all',
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        smoothScrolling: true,
        padding: { top: 12, bottom: 12 },
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        overviewRulerBorder: false,
        scrollbar: {
          verticalSliderSize: 6,
          horizontalSliderSize: 6,
        },
      }}
    />
  );
}
