// THIS IS THE A. Form + state, log the name on submit CODE 

export default function SearchForm({
  name,
  setName,
  onSubmit,
  loading,
  isValid
}) {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={name}
        onChange={event => setName(event.target.value)}
        placeholder="Enter GitHub username"
        aria-label="GitHub username"
      />

      <button disabled={loading || !isValid}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}