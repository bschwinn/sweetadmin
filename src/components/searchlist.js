function Searches ({searches}) {
    return (
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