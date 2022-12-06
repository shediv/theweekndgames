import BaseLayout from '@/components/BaseLayout'
import Head from 'next/head'
import Register from '@/components/Register'

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>The Weeknd Games</title>
        <meta name="description" content="The Weeknd Games - Get all sports news" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BaseLayout>
      
        <Register/>
      
      </BaseLayout>


    </>
  )
}
