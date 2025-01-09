type CreateReplyInputProps = {
    replyContent: string, setReplyContent: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: any,
    reply_id: number
}

function CreateReplyInput({
    replyContent, setReplyContent,
    handleSubmit, reply_id}: CreateReplyInputProps
) {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <textarea id={'reply-content-input-' + reply_id} placeholder="Enter your reply here" value={replyContent} onChange={
                        (e: any) => setReplyContent(e.target.value)
                    }></textarea>
                </label>
                <br/>
                <button type="submit">Post reply</button>
            </form>
        </div>
    )
}

export default CreateReplyInput