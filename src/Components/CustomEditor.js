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
import '../App.css';

/* 
    Custom Editor :
    Here I have used React Ace library to customize the editor
*/
const Customeditor = ({ editorData, index, onChange, displayPreview, editormode }) => {

    // This function is reponsible to set the editordata state and cobine html+css+js for the live view and set it's state
    const bindChanges = (value) => {
        const result = editorData;
        result[index]["content"] = value
        onChange(result);
        displayPreview("<html><body>" + editorData[0]["content"] + "<style>" + editorData[1]["content"] + "</style><script>" + editorData[2]["content"] + "</script><body></html>")
    }
    return (
        <>
        {/* 
          Mode : Sets the language for the editor 
          value : populates contents into the editor
          theme : to set the theme
          wrapEnabled : to wrap the contents of the editor
          highlightActiveLine : this highlight the line where the user's cursor is present
          autoScrollEditorIntoView : as its set to true, the editor becomes scrollable.
          showLineNumbers : line numbers are made visible dude to this prop
        */}
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
                setOptions={{
                    showLineNumbers: true,
                    tabSize: 2,
                }}
            />
        </>
    );
}

export default Customeditor;