import Image from 'next/image'
import styles from './page.module.css'
import { Button } from '@mantine/core'

export default function Home() {
  return (
    <main className={styles.main}>
     <Button>ボタン</Button>
    </main>
  )
}
