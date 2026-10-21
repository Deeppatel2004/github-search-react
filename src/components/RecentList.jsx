//  THIS IS THE F.RRECENT LIST CODE 
export default function RecentList({ recent, onSearch })
// Receives recent searches and the search function from App.jsx
 {
  if (recent.length === 0) {
    return null;
  }
  // If there are no recent searches, show nothing.

  return (
    <section>
      <h2>Recent searches</h2>

      <ul>
        {recent.map(name => (
          <li key={name.toLowerCase()}>
            <button onClick={() => onSearch(name)}>
              {name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}