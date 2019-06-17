export const getFullName = (userId, users) => {
    const {first_name, last_name} = users[userId];
    return `${first_name} ${last_name}`;
};
export const getAlbum = (albumId, albums) => {
    const {album_title} = albums[albumId];
    return `${album_title}`;
};

export const getAlbumArtist = (albumId, albums) => {
    const {artist} = albums[albumId];
    return `${artist}`;
};

export const getProfileImage = (userId, users) => {
    const image = users[userId].profile.image;
    return image ? image : 'http://i.imgur.com/uuykYlB.png';
};
