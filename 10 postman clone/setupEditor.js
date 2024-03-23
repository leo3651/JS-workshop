import { EditorState, basicSetup } from "@codemirror/basic-setup";
import { indentWithTab } from "@codemirror/commands";
import { EditorView, keymap } from "@codemirror/view";

export default function setupEditors() {
  const jsonRequestBody = document.getElementById("request-json-content");
  const jsonResponseBody = document.getElementById("body-content");

  const basicExtensions = [basicSetup, keymap.of([indentWithTab])];

  const requestEditor = new EditorView({
    state: EditorState.create({
      doc: "{\n\t\n}",
      extensions: basicExtensions,
    }),
    parent: jsonRequestBody,
  });

  const responseEditor = new EditorView({
    state: EditorState.create({
      doc: "{\n\t\n}",
      extensions: [...basicExtensions, EditorView.editable.of(false)],
    }),
    parent: jsonResponseBody,
  });

  const updateResponseEditor = function (value) {
    responseEditor.dispatch({
      changes: {
        from: 0,
        to: responseEditor.state.doc.length,
        insert: JSON.stringify(value, null, 2),
      },
    });
  };

  console.log(requestEditor);
  console.log(responseEditor);

  return { requestEditor, updateResponseEditor };
}
