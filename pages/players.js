import BaseLayout from '@/components/BaseLayout'
import Head from 'next/head'
import PlayersList from '@/components/PlayersList'
import styles from "@/styles/common.module.css"

export default function HomePage() {
  return (
    <>
      <Head>
        <title>The Weeknd Games</title>
        <meta name="description" content="The Weeknd Games - Get all sports news" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BaseLayout>
        <div className={styles.background}>
            <PlayersList/>
        </div>
      </BaseLayout>


    </>
  )
}
