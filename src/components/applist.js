import Link from 'next/link'

function AppList ({apps}) {
    return (
        <form>
            <table id="applist">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Publisher</th>
                        <th></th>
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
    console.log(app);
    return <tr>
        <td title={app.description}><Link href="/admin/apps/[appname]" as={`/admin/apps/${app.name}`}><a>{app.title}</a></Link></td>
        <td>{app.publisher}</td>
        <td><img src={app.icon} /></td>
    </tr>
}

export default AppList