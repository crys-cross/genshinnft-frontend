import "../styles/globals.css"
import Head from "next/head"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"
import Header from "../components/Header"

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>BlockChain Genshin Impact Demo</title>
                <meta name="description" content="Blockchain Genshin Impact Demo" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <NotificationProvider>
                    <Header />
                    <Component {...pageProps} />
                </NotificationProvider>
            </MoralisProvider>
        </div>
    )
}

export default MyApp
