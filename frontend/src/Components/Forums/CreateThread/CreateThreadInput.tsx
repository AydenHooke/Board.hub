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
            <form className="thread-form" onSubmit={handleSubmit}>
                <h2>Make a Thread</h2>
                <label>
                    <input id="thread-title-input" type="text" value={threadTitle} placeholder="Enter title of thread" onChange={
                        (e: any) => setThreadTitle(e.target.value)
                    }></input>
                </label>
                <br/>
                <label>
                    {/* <input type="text" value={threadContent} onChange={
                        (e: any) => setThreadContent(e.target.value)
                    }></input> */}
                    <textarea name="thread-content" id="thread-content-input" value={threadContent} placeholder="Enter content of thread" onChange={
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