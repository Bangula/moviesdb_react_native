export const getPoster = url => {
  return `http://image.tmdb.org/t/p/original${url}`;
};

export const getPosterSmall = url => {
  return `http://image.tmdb.org/t/p/w342${url}`;
};

export const getProfileImage = url => {
  return `http://image.tmdb.org/t/p/w185${url}`;
};

export const getBackdropImage = url => {
  return `http://image.tmdb.org/t/p/w780${url}`;
};
