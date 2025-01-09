type CreateThreadInputProps = {
    threadTitle: string, setThreadTitle: React.Dispatch<React.SetStateAction<string>>,
    threadContent: string, setThreadContent: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: any
};

function CreateThreadInput({
    threadTitle, setThreadTitle,
    threadContent, setThreadContent,
    handleSubmit}: CreateThreadInputProps
) {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter title of thread:
                    <input id="thread-title-input" type="text" value={threadTitle} onChange={
                        (e: any) => setThreadTitle(e.target.value)
                    }></input>
                </label>
                <br/>
                <label>
                    Enter content of thread:
                    {/* <input type="text" value={threadContent} onChange={
                        (e: any) => setThreadContent(e.target.value)
                    }></input> */}
                    <textarea name="thread-content" id="thread-content-input" value={threadContent} onChange={
                        (e: any) => setThreadContent(e.target.value)
                    }></textarea>
                </label>
                <br/>
                <button type="submit">Create Thread</button>
            </form>
        </div>
    )
}

export default CreateThreadInput