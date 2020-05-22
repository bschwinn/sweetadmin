class SettingsEditor extends React.Component {
    constructor(props) {
      super(props);
      const {settings, manifest} = props;
      this.state = {
        settings: JSON.stringify(settings, null, 2),
        manifest: JSON.stringify(manifest, null, 2)
      };
  
      this.handleManifestChange = this.handleManifestChange.bind(this);
      this.handleSettingsChange = this.handleSettingsChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleManifestChange(event) {
        this.setState({manifest: event.target.value});
    }

    handleSettingsChange(event) {
        this.setState({settings: event.target.value});
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const opts = { method: "POST", headers: { "content-type": "application/json" } };
        try {
            opts.body = JSON.stringify({ settings: JSON.parse(this.state.settings) });
            console.log(`sending settings: ${opts.body}`);
            let res = await fetch(`/api/admin/settings`, opts);
            if (res.status !== 200) {
                console.log(`error saving settings: ${res.statusText} (${res.status})`);
            }
            opts.body = JSON.stringify({ manifest: JSON.parse(this.state.manifest) });
            console.log(`sending manifest: ${opts.body}`);
            res = await fetch(`/api/admin/manifest`, opts);
            if (res.status !== 200) {
                console.log(`error saving manifest: ${res.statusText} (${res.status})`);
            }
        } catch(e) {
            console.error('error saving org settings', e);
            event.preventDefault();
        }
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Organization Settings</label>
            <textarea className="jsonEdit" onChange={this.handleSettingsChange} value={this.state.settings} />
          </div>
          <div>
            <label>Manifest Overrides</label>
            <textarea className="jsonEdit" onChange={this.handleManifestChange} value={this.state.manifest} />
          </div>
          <input type="submit" value="Save" />
        </form>
      );
    }
}

export default SettingsEditor