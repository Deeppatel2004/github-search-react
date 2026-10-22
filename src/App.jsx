import { useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { fetchUser } from "./api";
import {
  isValidUser,
  pickUser,
  errorFor,
  addRecent
} from "./helpers";

import SearchForm from "./components/searchForm";
import UserCard from "./components/userCard";
import RecentList from "./components/RecentList";
import "./App.css";

export default function App() {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recent, setRecent] = useState([]);

  async function searchUser(username) {
    const trimmedName = username.trim();

    if (!isValidUser(trimmedName)) return;

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await fetchUser(trimmedName);

      setUser(pickUser(data));
      setRecent(previous => addRecent(previous, trimmedName));
    } catch (error) {
  setError(errorFor(error));
}
 finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchUser(name);
  }

  return (
    <main className="app">
      <h1>GitHub User Search</h1>

      <SearchForm
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
        loading={loading}
        isValid={isValidUser(name)}
      />

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {user && <UserCard user={user} />}

      <RecentList
        recent={recent}
        onSearch={username => {
          setName(username);
          searchUser(username);
        }}
      />
    </main>
  );
}