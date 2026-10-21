// THIS IS THE B. fetch + show the raw JSON on the page CODE

export function userUrl(name) {
  return `https://api.github.com/users/${encodeURIComponent(name)}`;
}

export async function fetchUser(name) {
  const response = await fetch(userUrl(name));

  if (!response.ok) {
    throw new Error(String(response.status));
  }

  return response.json();
}