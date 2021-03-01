import React from "react";
import styles from "./Main.module.css";

type Props = {
  Section: React.FC;
};

const Main: React.FC<Props> = ({ Section }) => (
  <main className={styles.main}>
    <h1 className={styles.title}>Free Note</h1>
    <Section />
  </main>
);

export default Main;
