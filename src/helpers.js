export function isValidUser(name) {
  const username = name.trim();

  return username !== '' && !username.includes(' ');
}

export function shouldFetch(url) {
  return Boolean(url);
}

export function userUrl(name) {
  const username = name.trim();

  return `https://api.github.com/users/${encodeURIComponent(username)}`;
}

export function pickUser(data) {
  return {
    login: data.login,
    name: data.name || data.login,
    avatar: data.avatar_url,
    repos: data.public_repos,
    followers: data.followers,
    bio: data.bio || 'No bio'
  };
}

export function toStatus(error) {
  const status = Number(error?.message);

  if (status === 404 || status === 403) {
    return status;
  }

  // Fetch network errors usually have no HTTP status.
  return 0;
}

export function errorFor(error) {
  if (error === 404) {
    return 'User not found';
  } else if (error === 403) {
    return 'Too many requests. Try again in a minute.';
  } else if (error === 0) {
    return 'No internet. Try again.';
  } else {
    return 'Something went wrong';
  }
}

export function addRecent(list, name) {
  const filtered = list.filter(
    user => user.toLowerCase() !== name.toLowerCase()
  );

  return [name, ...filtered].slice(0, 5);
}

export function readStore(saved, initial) {
  if (saved === null) {
    return initial;
  }

  try {
    return JSON.parse(saved);
  } catch {
    return initial;
  }
}
