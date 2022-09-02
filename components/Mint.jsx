import { useWeb3Contract } from "react-moralis"
import networkAddresses from "../constants/networkAddresses.json"
import genshinNftabi from "../constants/genshinNftAbi.json"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "@web3uikit/core"
import { Button } from "@web3uikit/core"
import Image from "next/image"
import { paimon } from "../assets/index"

const Mint = () => {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    console.log(parseInt(chainIdHex))
    const chainId = parseInt(chainIdHex)
    const genshinAddress = chainId in networkAddresses ? networkAddresses[chainId][0] : null
    const [mintFee, setMintFee] = useState("0")
    const [wishCounter, setWishCounter] = useState("0")
    const [threeStarCounter, setThreeStarCounter] = useState("0")
    const [fourStarCounter, setFourStarCounter] = useState("0")
    const [fiveStarCounter, setFiveStarCounter] = useState("0")
    const [totalMinted, setTotalMinted] = useState("0")
    const dispatch = useNotification()

    const {
        runContractFunction: wishBannerNft,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: genshinNftabi,
        contractAddress: genshinAddress,
        functionName: "wishBannerNft",
        params: {},
        msgValue: mintFee,
    })

    const { runContractFunction: getMintFee } = useWeb3Contract({
        abi: genshinNftabi,
        contractAddress: genshinAddress,
        functionName: "getMintFee",
        params: {},
    })

    const { runContractFunction: getWishCounter } = useWeb3Contract({
        abi: genshinNftabi,
        contractAddress: genshinAddress,
        functionName: "getWishCounter",
        params: {},
    })

    const { runContractFunction: getThreeStarCounter } = useWeb3Contract({
        abi: genshinNftabi,
        contractAddress: genshinAddress,
        functionName: "getThreeStarCounter",
        params: {},
    })

    const { runContractFunction: getFourStarCounter } = useWeb3Contract({
        abi: genshinNftabi,
        contractAddress: genshinAddress,
        functionName: "getFourStarCounter",
        params: {},
    })

    const { runContractFunction: getFiveStarCounter } = useWeb3Contract({
        abi: genshinNftabi,
        contractAddress: genshinAddress,
        functionName: "getFiveStarCounter",
        params: {},
    })

    const { runContractFunction: getsWishCounter } = useWeb3Contract({
        abi: genshinNftabi,
        contractAddress: genshinAddress,
        functionName: "getsWishCounter",
        params: {},
    })

    const { runContractFunction: getTokenCounter } = useWeb3Contract({
        abi: genshinNftabi,
        contractAddress: genshinAddress,
        functionName: "getTokenCounter",
        params: {},
    })

    const updateUI = async () => {
        const mintFeeFromCall = await getMintFee()
        setMintFee(mintFeeFromCall)
        setWishCounter(await getWishCounter())
        setThreeStarCounter(await getThreeStarCounter())
        setFourStarCounter(await getFourStarCounter())
        setFiveStarCounter(await getFiveStarCounter())
        setTotalMinted(await getTokenCounter())
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleSuccessNotification(tx)
        updateUI()
    }

    const handleSuccessNotification = () => {
        dispatch({
            type: "sucess",
            message: "Entered Successfully",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <section>
            <div>
                <Image src={paimon} />
                <p>
                    This is for demo purposes to show a gacha system on a blockchain. All trademarks
                    and copyrights belong to Hoyoverse. Press Wish Button below to mint an NFT.
                    Every 10th mint guarantees a 4 Star or above. Please click details for more
                    info.
                </p>
            </div>
            <div>
                {genshinAddress ? (
                    <Button
                        onClick={async () =>
                            await wishBannerNft({
                                // onComplete:
                                // onError:
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        text="Wish"
                        theme="outline"
                    />
                ) : (
                    <div>
                        <p>
                            Please Connect Wallet and switch to supported networks which are:
                            Goerli, Mumbai, Fantom Test, and Fuji.
                        </p>
                    </div>
                )}
            </div>
            <div>
                <h4>Stats</h4>
                <ul>
                    <li>Wish(Mint) Price: {mintFee} ETH</li>
                    <li>Wish Counter: {wishCounter}</li>
                    <li>Total 3 Stars: {threeStarCounter}</li>
                    <li>Total 4 Stars: {fourStarCounter}</li>
                    <li>Total 5 Stars: {fiveStarCounter}</li>
                    <li>Total Minted: {totalMinted}</li>
                </ul>
            </div>
        </section>
    )
}

export default Mint
