import { useEffect, useState } from "react";
import AppRoutes from "./routes";
import { initAppLoad } from "./controllers/app";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initAppLoad().then(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Please wait ...</p>;

  return <AppRoutes />;
}
