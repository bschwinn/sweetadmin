import Link from 'next/link'
import { getSearchEngine, createSearchEngine, updateSearchEngine, deleteSearchEngine } from '../../api'
import Layout from '../../components/layout'

import of from '@openfin/service-utils/modules/misc/of';

function SearchPage ({search}) {
    return (
        <Layout page="Edit App">
            <SearchEdit search={search} />
        </Layout>
    )
}

const emptySearch = {
    name : "",
    title: "",
    description: "",
    url: "",
    icon: ""
}

export async function getServerSideProps(ctx) {
    const searchname = ctx.req.params.searchname;
    const searchprops = { props : { search: {...emptySearch}} };
    if (searchname !== '' && searchname !== 'new') {
        const { res: search, err } = await of(getSearchEngine(ctx, searchname));
        if (err) {
            console.error('error getting search', err);
            return searchprops
        }
        searchprops.props = {search};
        return searchprops;
    }
    return searchprops;
}

class SearchEdit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {...props.search};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const t = event.target;
        this.setState({ [t.name]: t.value } );
    }
    
    async handleDelete() {
        const { res: resp, err } = of(deleteSearchEngine(this.state.name));
        if (err) {
            this.handleError('error deleting search', err);
            return;
        }
        window.location.href = '/admin/searches';
    }

    async handleSubmit(event) {
        event.preventDefault();
        const app = {
            engine: {
                name: this.state.name,
                title: this.state.title,
                description: this.state.description,
                url: this.state.url,
                icon: this.state.icon
            }
        }
        if ( this.state.id ) {
            const { res: resp, err } = of(updateSearchEngine(this.state.id, JSON.stringify(app)));
            if (err) {
                this.handleError('error updating search', err)
                return;
            }
        } else {
            const { res: resp, err } = await of(createSearchEngine(JSON.stringify(app)));
            if (err) {
                this.handleError('error creating search', err)
                return;
            }
        }
        window.location.href = '/admin/searches';
    }
  
    handleError(msg, err) {
        console.error(msg, err);
        const elem = document.querySelector('#searchEdit label.title error');
        elem.setAttribute('title', err.message)
        elem.innerHTML = msg;
    }

    render() {
      const {id, name, title, description, url, icon } = this.state;
      return (
        <form id="searchEdit" onSubmit={this.handleSubmit}>
            <label className="title">{id ? `Editing ${name}` : 'New Search'} <error></error></label>
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
                Endpoint URL
                <input type="text" name="url" onChange={this.handleChange} value={url} />
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


export default SearchPage