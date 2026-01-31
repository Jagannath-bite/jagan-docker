import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px", fontSize: "24px" }}>
      <h2>React Frontend</h2>
      <p>{message}</p>
    </div>
  );
}

export default App;
