import React, { useRef } from "react";
import EmailEditor from "react-email-editor";

function App() {
  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      // download html file
      const fileData = html;
      const blob = new Blob([fileData], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "template.html";
      link.href = url;
      link.click();
    });
  };
  const saveTemplate = () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.saveDesign((design) => {
      const fileData = JSON.stringify(design);
      const blob = new Blob([fileData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "template.json";
      link.href = url;
      link.click();
    });
  };
  const loadTemplate = (e) => {
    const unlayer = emailEditorRef.current?.editor;
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const designData = JSON.parse(event.target.result);
          unlayer?.loadDesign(designData);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      };

      reader.readAsText(file);
    }
  };
  return (
    <main>
      <div className="min-h-screen flex">
        <React.StrictMode>
          <EmailEditor ref={emailEditorRef} />
        </React.StrictMode>
      </div>
      <div className="m-4 flex gap-4">
        <button
          className="px-4 py-2 rounded bg-black text-white"
          onClick={exportHtml}
        >
          Export HTML
        </button>
        <button
          className="px-4 py-2 rounded bg-black text-white"
          onClick={saveTemplate}
        >
          Save Template
        </button>
        {/* input design */}
        <button className="px-4 py-2 rounded bg-black text-white relative">
          <input
            className="absolute opacity-0 inset-0 w-full h-full cursor-pointer "
            type="file"
            accept=".json"
            onChange={loadTemplate}
          />
          Load Template
        </button>
      </div>
    </main>
  );
}

export default App;
