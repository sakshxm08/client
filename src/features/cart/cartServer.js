export const cartServer = async (user, cart, error, setError) => {
  if (user) {
    const response = await fetch(
      "https://wearworx-server.onrender.com/api/cart",
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    const json = await response.json();

    if (json.length > 0) {
      const response = await fetch(
        "https://wearworx-server.onrender.com/api/cart",
        {
          method: "PATCH",
          body: JSON.stringify(cart),
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        return;
      }
    } else {
      const response = await fetch(
        "https://wearworx-server.onrender.com/api/cart",
        {
          method: "POST",
          body: JSON.stringify(cart),
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        return;
      }
    }
  }
};
