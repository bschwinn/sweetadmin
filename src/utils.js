export function getUserName(user) {
    let name = user.email;
    if (user.firstName !== '' || user.lastName !== '') {
        name = `${user.firstName} ${user.lastName}`
    } else if (user.firstName === '' && user.lastName !== '') {
        name = `${user.lastName}, -`
    }
    return name;
}

export function isUserTempPasswordExpired(user, userSince) {
    if (user.status === 'FORCE_CHANGE_PASSWORD') {
        const diff = new Date().getTime() - userSince.getTime();
        const limit = 86400000 * 30;
        if (diff > limit) {
            return true;
        }
    }
    return false;
}
export function getUserSatus(user, userSince) {
    let ret = '👍';
    if (!user.enabled) {
        ret = '💔';
    }
    if (user.status === 'FORCE_CHANGE_PASSWORD') {
        ret = '🤷';
    }
    if (isUserTempPasswordExpired(user, userSince)) {
        const diff = new Date().getTime() - userSince.getTime();
        const limit = 86400000 * 30;
        if (diff > limit) {
            ret = '💩';
        }
    }
    return ret;
}

export function formatUserSince(userSince) {
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });
    const [{ value: month },,{ value: day },,{ value: year }] = dtf.formatToParts(userSince);
    return `${month} ${day} ${year}`;
}
