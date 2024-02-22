import { Box, Button, Input } from "@mui/material";
import { useState } from "react";

const CommentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    initialText = '',
    handleCancel,
}) => {
    const [text, setText] = useState(initialText);
    const textAreaDisable = text.length === 0;

    const onSubmit = e => {
        e.preventDefault();
        handleSubmit(text)
        setText('')
    }

    const inputStyle = {
        border: 1,
        height: 100,
        width: '100%',
        marginLeft: 3,
        padding: 3,
        color:"white"
    }
    return (
        <form onSubmit={onSubmit} className="w-full text-white">
            <Input onChange={(e) => setText(e.target.value)} value={text} placeholder='Write a Comment' sx={inputStyle} />
            <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginTop: '5px', marginBottom: '10px', marginLeft: 3, width: '100%', }}>
                <Button type="submit" disabled={textAreaDisable} className='bg-blue-400' variant="contained">{submitLabel}</Button>
                {hasCancelButton &&
                    <Button type="button"
                        onClick={handleCancel}
                    >Cancel</Button>}
            </Box>
        </form>
    );
};

export default CommentForm;