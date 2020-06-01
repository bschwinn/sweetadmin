import fetch from 'node-fetch'

async function callAPIServer(ctx, path) {
    const res = await fetch(`${process.env.BASE_URL}/api/admin/${path}`, { headers: { cookie: ctx.req.headers.cookie }});
    const json = await res.json();
    if (!res.ok) {
        throw { status: res.status, code: json.code, message:json.message };
    }
    return json;
}

async function callAPI(path, method, body) {
    const opts = { method: method };
    if (body) {
        opts.body = body;
        opts.headers = { "content-type" : "application/json" };
    }
    const res = await fetch(`/api/admin/${path}`, opts);
    const json = await res.json();
    if (!res.ok) {
        throw { status: res.status, code: json.code, message:json.message };
    }
    return json;
}

// Application management
export async function getApps(ctx) {
    return callAPIServer(ctx, "apps", 'GET');
}

export async function getApp(ctx, appname) {
    return callAPIServer(ctx, `apps/${appname}`, 'GET');
}

export async function createApp(app) {
    return callAPI(`apps`, 'POST', app);
}

export async function updateApp(appname, updates) {
    return callAPI(`apps/${appname}`, 'PUT', updates);
}

export async function deleteApp(appname) {
    return callAPI(`apps/${appname}`, 'DELETE');
}


// Org settings management
export async function getSettings(ctx) {
    return callAPIServer(ctx, "settings", 'GET');
}

export async function getManifest(ctx) {
    return callAPIServer(ctx, "manifest", 'GET');
}


// User management
export async function getUsers(ctx) {
    return callAPIServer(ctx, "users", 'GET');
}

export async function getUser(ctx, username) {
    return callAPIServer(ctx, `users/${username}`, 'GET');
}

export async function createUser(user) {
    return callAPI(`users`, 'POST', user);
}

export async function updateUser(username, updates) {
    return callAPI(`users/${username}`, 'PUT', updates);
}

export async function deleteUser(username) {
    return callAPI(`users/${username}`, 'DELETE');
}

export async function resendUser(email) {
    return callAPI(`users/${email}/resend`, 'POST');
}


// Search engine management
export async function getSearchEngines(ctx) {
    return callAPIServer(ctx, "search-engines", 'GET');
}

export async function getSearchEngine(ctx, name) {
    return callAPIServer(ctx, `search-engines/${name}`, 'GET');
}

export async function createSearchEngine(engin) {
    return callAPI(`search-engines`, 'POST', engin);
}

export async function updateSearchEngine(name, updates) {
    return callAPI(`search-engines/${name}`, 'PUT', updates);
}

export async function deleteSearchEngine(name) {
    return callAPI(`search-engines/${name}`, 'DELETE');
}
