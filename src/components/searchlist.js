function Searches ({searches}) {
    return (
        <form>
            <label>Organization Apps</label>
            <table id="searchlist">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Publisher</th>
                    </tr>
                </thead>
                <tbody>
                {searches.map(search => <Search key={search.name} search={search} />)}
                </tbody>
            </table>
        </form>
    )
}

function Search (props) {
    const {search} = props;
    // console.log(search);
    return <tr>
        <td>{search.url}</td>
        <td>{search.publisher}</td>
    </tr>
}

export default Searches