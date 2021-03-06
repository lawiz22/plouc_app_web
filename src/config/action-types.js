const MODELS = [

    // Accounts
    'USERS',

    // Credits
    'INVITATIONS',
    'TRANSFERS',
    'WALLETS',

    // Posts
    'POSTS',

    // Albums
    'ALBUMS',

    // Artist
    'ARTISTS',

    //Songs
    'SONGS',

    // Private messages
    'PRIVATE_MESSAGES',

    // Replies
    'POST_REPLIES',

    // Replies album
    'ALBUM_REPLIES',

    // Replies artist
    'ARTIST_REPLIES',

    // Replies song
    'SONG_REPLIES',

    // User roles
    'ADMINISTRATORS',
    'MODERATORS',

    // Votes
    'POST_VOTES',

    // Votes Album
    'ALBUM_VOTES',

    // Votes Artist
    'ARTIST_VOTES',
    
    // Votes Album
    'SONG_VOTES',

];

const VIEWS = [

    // Authentication
    'LOGIN',
    'LOGOUT',

];

const addStatus = names => {
    return names.reduce((acc, name) => {
        acc[`${name}_PENDING`] = `${name}_PENDING`;
        acc[`${name}_SUCCESS`] = `${name}_SUCCESS`;
        acc[`${name}_ERROR`] = `${name}_ERROR`;
        return acc;
    }, {});
};

const setUnset = models => {
    let results = [];
    models.forEach(model => {
        results.push(`SET_${model}`);
        results.push(`UNSET_${model}`);
    });
    return results;
};

const actionTypes = {
    ...addStatus(setUnset(MODELS)),
    ...addStatus(VIEWS),
};


export default actionTypes;
