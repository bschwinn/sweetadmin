import Link from 'next/link'

function Searches ({searches}) {
    return (
        <table id="searchlist">
        <thead>
            <tr>
                <th>Title</th>
                <th>Provider</th>
                <th></th>
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
    console.log(search);
    return <tr>
        <td title={search.description}><Link href="/admin/searches/[searchname]" as={`/admin/searches/${search.name}`}><a>{search.title}</a></Link></td>
        <td>{search.provider}</td>
        <td><img className="appicon" src={search.icon} /></td>
    </tr>
}

export default Searches