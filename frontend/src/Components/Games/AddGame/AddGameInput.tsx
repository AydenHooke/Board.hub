type stateProp = {
    bggId: number, setBggId: React.Dispatch<React.SetStateAction<number>>,
    gameImageUrl: string, setGameImageUrl: React.Dispatch<React.SetStateAction<string>>,
    title: string, setTitle: React.Dispatch<React.SetStateAction<string>>,
    description: string, setDescription: React.Dispatch<React.SetStateAction<string>>,
    isChecked: boolean, setIsChecked: React.Dispatch<React.SetStateAction<boolean>>,
    pending: boolean,
    success: boolean,
    fail: boolean,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

function AddGameInput({
    bggId, setBggId,
    gameImageUrl, setGameImageUrl,
    title, setTitle,
    description, setDescription,
    isChecked, setIsChecked,
    pending,
    success,
    fail,
    handleSubmit}: stateProp
) {
 return (
    <form onSubmit={handleSubmit}>
        {(!isChecked) && <h2>Add a Custom Game</h2>}
        {(isChecked) && <h2>Add a Game from BGG</h2>}

        <label>
            Use BGG ID:
            <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
        </label>

        {(!isChecked) &&
            <>
                <br/>
                <label>
                    <input required type="text" placeholder="Enter Title of Game" value={title} onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
                    }/>
                </label>
                <br/>
                <label>
                    <input required type="text" placeholder="Enter Description of Game" value={description} onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)
                    }/>
                </label>
                <br/>
                <label>
                    <input type="text" placeholder="Enter a URL of the Game Image" value={gameImageUrl} onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => setGameImageUrl(e.target.value)
                    }/>
                </label>
                <br/>
            </>
        }

        {(isChecked) && 
            <>
                <br/>
                <label>
                    <input required type="number" placeholder="Enter BGG ID" value={`${bggId}`} onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => setBggId(parseInt(e.target.value))
                    }/>
                </label>
                <br/>
            </>
        }

        {(pending) && <button className="default-button" type="submit">Add</button>}
        {(!pending) && <p>Request is pending</p>}
        {(success) && <p>Successfully added game</p>}
        {(fail) && <p>Failed to add game</p>}
        <br/>
    </form>
 )
}

export default AddGameInput