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
import Link from "next/link"

const Mint = () => {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    console.log(parseInt(chainIdHex))
    const chainId = parseInt(chainIdHex)
    const genshinAddress =
        chainId in networkAddresses ? networkAddresses[chainId]["WishNft"][0] : null
    console.log(`Working with contract address: ${genshinAddress}`)
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

    const { runContractFunction: getTokenCounter } = useWeb3Contract({
        abi: genshinNftabi,
        contractAddress: genshinAddress,
        functionName: "getTokenCounter",
        params: {},
    })

    const updateUI = async () => {
        const mintFeeFromCall = (await getMintFee()).toString()
        setMintFee(mintFeeFromCall)
        const wishCounterFromCall = (await getWishCounter()).toString()
        setWishCounter(wishCounterFromCall)
        const threeStarFromCall = (await getThreeStarCounter()).toString()
        setThreeStarCounter(threeStarFromCall)
        const fourStarFromCall = (await getFourStarCounter()).toString()
        setFourStarCounter(fourStarFromCall)
        const fiveStarFromCall = (await getFiveStarCounter()).toString()
        setFiveStarCounter(fiveStarFromCall)
        const totalMintedFromCall = (await getTokenCounter()).toString()
        setTotalMinted(totalMintedFromCall)
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
            <div className="flex md:flex-row flex-col-reverse sm:py-16 py-6">
                <Image src={paimon} alt="paimon" className="w-[100%] h-[100%] relative z-[5]" />
                <div className="flex-1 flex justify-center items-start flex-col">
                    <p className="indent-5 font-medium text-[18px] leading-[30.8px] max-w-[470px] mt-5 px-2">
                        This is for demo purposes to show a gacha system on a blockchain. All
                        trademarks and copyrights belong to Hoyoverse. Press Wish Button below to
                        mint an NFT. Every 10th mint guarantees a 4 Star or above. Please click{" "}
                        <Link href="/details">
                            <a className="cursor-pointer hover:text-white">details</a>
                        </Link>{" "}
                        for more info.
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center py-10">
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
                        size="xl"
                        text="Wish"
                        theme="outline"
                        isLoading={isLoading || isFetching ? true : false}
                        loadingText={
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full mr-4"></div>
                        }
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
            <div className="flex flex-col items-center">
                <h4 className="font-medium">INFO</h4>
                <ul>
                    <li className="flex flex-row">
                        <div className="font-semibold">Wish(Mint) Price: &nbsp;&nbsp;</div>
                        {ethers.utils.formatUnits(mintFee, "ether")}
                        ETH
                    </li>
                    <li className="flex flex-row">
                        <div className="font-semibold">
                            Wish Counter: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        {wishCounter}
                    </li>
                    <li className="flex flex-row">
                        <div className="font-semibold">
                            Total 3 Stars: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        {threeStarCounter}
                    </li>
                    <li className="flex flex-row">
                        <div className="font-semibold">
                            Total 4 Stars: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        {fourStarCounter}
                    </li>
                    <li className="flex flex-row">
                        <div className="font-semibold">
                            Total 5 Stars: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        {fiveStarCounter}
                    </li>
                    <li className="flex flex-row">
                        <div className="font-semibold">
                            Total Minted: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        {totalMinted}
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Mint
