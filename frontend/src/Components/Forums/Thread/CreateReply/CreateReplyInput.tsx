
type CreateReplyInputProps = {
    replyContent: string, setReplyContent: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: any
}

function CreateReplyInput({
    replyContent, setReplyContent,
    handleSubmit}: CreateReplyInputProps
) {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter content of reply:
                    <input type="text" value={replyContent} onChange={
                        (e: any) => setReplyContent(e.target.value)
                    }></input>
                </label>
                <br/>
                <button type="submit">Create Reply</button>
            </form>
        </div>
    )
}

export default CreateReplyInput