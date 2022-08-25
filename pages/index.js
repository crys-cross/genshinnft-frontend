import Image from "next/image"
import styles from "../styles/Home.module.css"
import Mint from "../components/Header"
import Footer from "../components/Footer"

export default function Home() {
    return (
        <div className={styles.container}>
            {/* header / connect button / nav bar */}
            <Mint />
            <Footer />
        </div>
    )
}
