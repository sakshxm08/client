export const stashServer = async (user, stash, error, setError) => {
  if (user) {
    const response = await fetch("/api/stash", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (json.length > 0) {
      const response = await fetch("/api/stash", {
        method: "PATCH",
        body: JSON.stringify(stash),

        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);

        return;
      }
    } else {
      const response = await fetch("/api/stash", {
        method: "POST",
        body: JSON.stringify(stash),
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);

        return;
      }
    }
  }
};
