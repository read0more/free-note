import React from "react";
import styles from "./App.module.css";
import Aside from "./components/Aside/Aside";

function App() {
  return (
    <div className={styles.app}>
      <Aside />
      <main>main</main>
    </div>
  );
}

export default App;
