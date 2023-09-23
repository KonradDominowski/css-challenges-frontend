import styles from "./Title.module.scss";

export default function Title() {
  return (
    <div className={styles.title}>
      <h1>
        Learn HTML and CSS <br></br>by <strong>practicing</strong>
      </h1>
      <p>Choose a topic you want to practice, or go ahead and do all challenges from start to finish</p>
    </div>
  );
}
