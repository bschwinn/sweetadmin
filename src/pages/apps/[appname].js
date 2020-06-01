import Link from 'next/link'
import { getApp, createApp, updateApp, deleteApp } from '../../api'
import Layout from '../../components/layout'

import of from '@openfin/service-utils/modules/misc/of';

function AppPage ({app}) {
    return (
        <Layout page="Edit App">
            <AppEdit app={app} />
        </Layout>
    )
}

const emptyApp = {
    name : "",
    title: "",
    description: "",
    manifest: "",
    icons: []
}

export async function getServerSideProps(ctx) {
    const appname = ctx.req.params.appname;
    const appprops = { props : { user: {...emptyApp}} };
    if (appname !== '' && appname !== 'new') {
        const { res: app, err } = await of(getApp(ctx, ctx.req.params.appname));
        if (err) {
            console.error('error getting user', err);
            return appprops
        }
        appprops.props = {app};
        return appprops;
    }
    return appprops;
}

class AppEdit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {...props.app};
  
      console.log(this.state);
      this.handleChange = this.handleChange.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const t = event.target;
        let val = ( t.name === 'isAdmin' ) ? (t.checked===true) : t.value;
        this.setState({ [t.name]: val } );
    }
    
    async handleDelete() {
        const { res: resp, err } = of(deleteApp(this.state.name));
        if (err) {
            this.handleError('error deleting app', err);
            return;
        }
        window.location.href = '/admin/apps';
    }

    async handleSubmit(event) {
        event.preventDefault();
        const app = {
            application: {
                name: this.state.name,
                title: this.state.title,
                description: this.state.description,
                manifest: this.state.manifest,
                icons: [
                    {icon: this.state.icon}
                ]
            }
        }
        if ( this.state.id ) {
            const { res: resp, err } = of(updateApp(this.state.id, JSON.stringify(app)));
            if (err) {
                this.handleError('error updating app', err)
                return;
            }
        } else {
            const { res: resp, err } = await of(createApp(JSON.stringify(app)));
            if (err) {
                this.handleError('error creating app', err)
                return;
            }
        }
        window.location.href = '/admin/apps';
    }
  
    handleError(msg, err) {
        console.error(msg, err);
        const elem = document.querySelector('#appEdit label.title error');
        elem.setAttribute('title', err.message)
        elem.innerHTML = msg;
    }

    render() {
      const {id, name, title, description, manifest, icon } = this.state;
      return (
        <form id="appEdit" onSubmit={this.handleSubmit}>
            <label className="title">{id ? `Editing ${name}` : 'New App'} <error></error></label>
            <label>
                Name
                <input type="text" name="name" onChange={this.handleChange} value={name} />
            </label>
            <label>
                Title
                <input type="text" name="title" onChange={this.handleChange} value={title} />
            </label>
            <label>
                Description
                <input type="text" name="description" onChange={this.handleChange} value={description} />
            </label>
            <label>
                Manifest
                <input type="text" name="manifest" onChange={this.handleChange} value={manifest} />
            </label>
            <label>
                Icon
                <input type="text" name="icon" onChange={this.handleChange} value={icon} />
            </label>
            <footer>
                <Link href="/admin/apps"><input type="button" value="Cancel" /></Link>
                <input type="submit" value="Save" />
            </footer>
        </form>
      );
    }
}

export default AppPage