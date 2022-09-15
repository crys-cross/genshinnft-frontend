import Link from "next/link"

export default function Home() {
    return (
        <div className="bg-slate-300 min-h-screen">
            <div className={`sm:px-16 px-6 flex flex-col justify-center items-center`}>
                <p className="indent-5 font-medium text-dimWhite text-[18px] leading-[30.8px] max-w-[470px] mt-20 px-2">
                    All assests here are from chibi arts across the internet and are credited in the
                    README.md file. Rates are also explained in the README.md. For familiar Genshin
                    Fans, this is supposedly a rate up Banner with Nahida as the featured 5 Star and
                    Collei, Beidou, Sayu for the featured 4 stars. As for other 5 and 4 stars
                    available, will let you discover on your own. "AD ASTRA ABYSSOSQUE!"
                </p>
                <br />
                <br />
                <br />
                <Link href="/" className="flex flex-col items-center">
                    <a className="font-semibold hover:text-white">HOME</a>
                </Link>
            </div>
        </div>
    )
}
