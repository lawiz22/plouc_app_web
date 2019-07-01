export const getFullName = (userId, users) => {
    const {first_name, last_name} = users[userId];
    return `${first_name} ${last_name}`;
};

export const getFirstName = (userId, users) => {
  const {first_name} = users[userId];
  return `${first_name}`;
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

/**
 * From url file path download and return Audio Buffer
 * path - path to file
 * context - Audio Context
 */
export const getAudioBuffer = async (path, context) => {
    const response = await fetch(path);
    const audioData = await response.arrayBuffer();
    return new Promise((resolve, reject) => {
      context.decodeAudioData(audioData, buffer => {
        return resolve(buffer);
      });
    });
  };
  /**
   * Get window audio context
   */
  export const getContext = () => {
    window.AudioContext =
      window.AudioContext ||
      window.webkitAudioContext ||
      window.mozAudioContext ||
      window.oAudioContext;
    const context = new AudioContext();
    return context;
  };