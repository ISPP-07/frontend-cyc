import Image from 'next/image'
import LoginForm from './components/LoginForm'

export default function Home() {
	return (
		<main className="flex flex-row items-center justify-around w-screen h-screen">
			<Image
				src="/cycbackground.png"
				layout="fill"
				objectFit="cover"
				className="-z-10"
				quality={100}
			/>

			<Image
				src="/cyclogo.png"
				alt="Cirio Y Costal Logo"
				width={400}
				height={400}
			/>

			<LoginForm />
		</main>
	)
}
