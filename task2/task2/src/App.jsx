import { useEffect, useState } from "react";
import InputExchange from "./component/convert/inputExchange";
import Loading from "./component/Loading/index";

import "./App.scss";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  });

  return (
    <>
      {isLoading && <Loading />} <InputExchange />
    </>
  );
}

export default App;
