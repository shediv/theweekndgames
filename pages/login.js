import BaseLayout from '@/components/BaseLayout'
import Head from 'next/head'
import Login from '@/components/Login'

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>The Weeknd Games</title>
        <meta name="description" content="The Weeknd Games - Get all sports news" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BaseLayout>
      
        <Login/>
      
      </BaseLayout>


    </>
  )
}
