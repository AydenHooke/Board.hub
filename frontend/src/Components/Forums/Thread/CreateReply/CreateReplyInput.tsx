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
                    <textarea placeholder="Enter your reply here" value={replyContent} onChange={
                        (e: any) => setReplyContent(e.target.value)
                    }></textarea>
                </label>
                <br/>
                <button type="submit">Create Reply</button>
            </form>
        </div>
    )
}

export default CreateReplyInput