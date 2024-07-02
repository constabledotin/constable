// components/custom-editor.js
import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'subscript',
        'superscript',
        'link',
        'bulletedList',
        'numberedList',
        'todoList',
        '|',
        'outdent',
        'indent',
        'alignment',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'code',
        'codeBlock',
        'htmlEmbed',
        'horizontalLine',
        'pageBreak',
        'removeFormat',
        'specialCharacters',
        'findAndReplace',
        'highlight',
        'fontColor',
        'fontBackgroundColor',
        'fontFamily',
        'fontSize',
        'undo',
        'redo'
    ]
};

function CustomEditor( props ) {
    return (
        <CKEditor
        editor={ Editor }
        config={ editorConfiguration }
        data={ props.data }
        onChange={ props.onChange }
    />
    )
}

export default CustomEditor;
