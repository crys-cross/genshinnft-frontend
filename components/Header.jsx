import { ConnectButton } from "@web3uikit/web3"

const Header = () => {
    return (
        <div className="p-5 border-b-2 flex flex-row">
            <h1 className="py-2 px-4 font-blog text-2xl">Demo Blockchain Genshin NFT</h1>
            <div className="ml-auto py-2 px-4">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}
export default Header
