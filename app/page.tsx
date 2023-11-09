import styles from './page.module.css';
import { Button } from '@mantine/core';
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
  return (
    <main className={styles.main}>
      <Button>ボタン</Button>
    </main>
  );
}
