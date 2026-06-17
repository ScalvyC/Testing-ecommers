import { useEffect, useState } from "react";

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};

export function User() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Current logged-in user:", data);
        setUser(data);
      });
  }, []);

  return (
    <div>
      {user ? (
        <h1>Hi {user.firstName}</h1>
      ) : (
        <h1>Loading user...</h1>
      )}
    </div>
  );
}