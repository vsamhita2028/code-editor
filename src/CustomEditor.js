import AceEditor from 'react-ace';
import "ace-builds/webpack-resolver"
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-textmate";
const Customeditor = ({ editorData, index, onChange, displayPreview, editormode }) => {
    const bindChanges = (value) => {
        const result = editorData;
        result[index]["content"] = value
        onChange(result);
        displayPreview("<html><body>" + editorData[0]["content"] + "<style>" + editorData[1]["content"] + "</style><script>" + editorData[2]["content"] + "</script><body></html>")
    }
    return (
        <>
            <AceEditor
                height={"87%"}
                width={"100%"}
                mode={editorData[index].language}
                onChange={bindChanges}
                value={editorData[index]["content"]}
                theme={editormode}
                fontSize={14}
                wrapEnabled={true}
                highlightActiveLine={true}
                autoScrollEditorIntoView={true}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    showLineNumbers: true,
                    tabSize: 2,
                    useWorker: false
                }}
            />
        </>
    );
}

export default Customeditor;