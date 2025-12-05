import { useEffect, useRef, useState } from 'react';
import '@mdxeditor/editor/style.css'
import { ProgressBar } from './ProgressBar'
import {
    MDXEditor, InsertThematicBreak, ListsToggle, listsPlugin, thematicBreakPlugin, maxLengthPlugin,
    StrikeThroughSupSubToggles, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin, HighlightToggle
} from '@mdxeditor/editor'
import './styles/TextEditor.scss';
const MAX = 1000;
function TextEditor({ value, onChange, placeholder }) {
    const ref = useRef(null)
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(value ? value.length : 0);
        if (ref.current && value !== undefined) {
            ref.current.setMarkdown(value);
        }
    }, [value])

    const handleBlur = () => {
        if (ref.current) {
            let content = ref.current.getMarkdown();
            onChange(content);
        }
    };

    return (
        <div className="textEditorContrainer">
            <MDXEditor
                ref={ref} spellCheck={true} autoFocus={false} markdown={value || ''}
                contentEditableClassName="textEditorContent" placeholder={placeholder}
                length={count}
                onBlur={handleBlur} onChange={(v) => setCount(v.length)}
                // onChange={(markdown) => { onChange(markdown) }} // trop de delay
                plugins={[listsPlugin(), thematicBreakPlugin(), maxLengthPlugin(MAX), toolbarPlugin({
                    toolbarClassName: 'textEditorToolBar',
                    toolbarContents: () => (
                        <>
                            <UndoRedo />
                            <BoldItalicUnderlineToggles />
                            <HighlightToggle />
                            <StrikeThroughSupSubToggles />
                            <ListsToggle />
                            <InsertThematicBreak />
                        </>
                    )
                })]}
            />
            <div className='textEditorProgressBar'>
                <ProgressBar
                    progress={(count / MAX) * 100}
                />
            </div>
        </div>
    )
}

export default TextEditor