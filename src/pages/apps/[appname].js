import Link from 'next/link'
import { getApp, saveApp } from '../../api'
import Layout from '../../components/layout'

import of from '@openfin/service-utils/modules/misc/of';

function AppPage ({app}) {
    return (
        <Layout page="Edit App">
            <AppEdit app={app} />
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const { res: app, err } = await of(getApp(ctx, ctx.req.params.appname));
    if (err) {
        console.error('error getting app', err);
    }
  
    return {
      props: {
        app: app,
      },
    }
}

class AppEdit extends React.Component {
    constructor(props) {
      super(props);
      const {app} = props;
      this.state = {
        app: app
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const t = event.target;
        const a = this.state.app;
        switch(t.getAttribute('id')) {
            case "name" :
                a.name = t.value;
                break;
            case "title" :
                a.title = t.value;
                break;
            case "description" :
                a.description = t.value;
                break;
        }
        this.setState({app: a});
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const app = {
            name: this.state.app.name,
            title: this.state.app.title,
            description: this.state.app.description
        }
        const { res: resp, err } = of(saveApp(this.state.app.name, JSON.stringify(app)));
        if (err) {
            // TODO display error message to user
            console.error('error saving app', err);
            return;
        }
        window.location.href = '/admin/apps';
    }
  
    render() {
      const app = this.state.app;
      return (
        <form onSubmit={this.handleSubmit}>
            <label className="title"><Link href="/admin/apps"><a> &lt; </a></Link> Edit App</label>
            <label>
                Name
                <input id="name" className="edit" onChange={this.handleChange} value={app.name} />
            </label>
            <label>
                Title
                <input id="title" className="edit" onChange={this.handleChange} value={app.title} />
            </label>
            <label>
                Description
                <input id="description" className="edit" onChange={this.handleChange} value={app.description} />
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