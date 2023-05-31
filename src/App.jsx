import { useEffect, useState } from "react"
import './App.css'
import CodeMirror from '@uiw/react-codemirror'
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { linter, lintGutter } from "@codemirror/lint";

function App() {
  const [data, setData] = useState({status: "Waiting for data...", message: "please create some data using the CF-editor."})
  useEffect(() => {
    const dataHandler = (event) => {
      if (event.data.type !== "setCfData") {
        return;
      }
      setData(event.data.payload.data);
      console.log("event.data.payload.data:\n", event.data.payload.data)
    };

    window.addEventListener("message", dataHandler);
    return () => window.removeEventListener("message", dataHandler);
  }, [])
  

  return (
    <main>
      <CodeMirror
        value={JSON.stringify(data, null, 2)}
        height="100%"
        theme={"dark"}
        editable={false}
        extensions={
          [json(), linter(jsonParseLinter()), lintGutter()]
        }
      />
    </main>
  )
}

export default App
