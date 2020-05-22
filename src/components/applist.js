function AppList ({apps}) {
    return (
        <form>
            <label>Organization Apps</label>
            <table id="applist">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Publisher</th>
                    </tr>
                </thead>
                <tbody>
                {apps.map(app => <App key={app.name} app={app} />)}
                </tbody>
            </table>
        </form>
    )
}

function App (props) {
    const {app} = props;
    return <tr>
        <td title={app.description}>{app.title}</td>
        <td>{app.publisher}</td>
    </tr>
}

export default AppList