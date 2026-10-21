// THIS IS THE C. pickUser + the card CODE 


export default function UserCard({ user }) {
  return (
    <article className="user-card">
      <img src={user.avatar} alt={`${user.login}'s avatar`} />

      <h2>{user.name}</h2>
      <p>@{user.login}</p>
      <p>Public repositories: {user.repos}</p>
      <p>Followers: {user.followers}</p>
      <p>{user.bio}</p>

    </article>
  );
}