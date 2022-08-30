import "../styles/globals.css"
import Head from "next/head"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>Demo BlockChain Genshin NFT</title>
                <meta name="description" content="Blockchain Genshin Impact Demo" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <NotificationProvider>
                    <Component {...pageProps} />
                </NotificationProvider>
            </MoralisProvider>
        </div>
    )
}

export default MyApp
