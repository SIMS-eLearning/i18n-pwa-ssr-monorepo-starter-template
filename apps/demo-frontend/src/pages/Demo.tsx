import { useEffect, useState } from "react"
import { API_VERSION_URL } from "../global/frontend.settings";
import { Button } from "../components/ui/button";
import BasicNavigation from "../components/ui/BasicNavigation";

type Props = {
    initialHelloMessage?: string
}

const Demo: React.FC<Props> = ({ initialHelloMessage }) => {

    const [message, setMessage] = useState(initialHelloMessage ? initialHelloMessage : '') //initialize with message passed, if any

    const fetchBackend = async () => {
        try {
            const message = await fetch(`${API_VERSION_URL}/hello`);
            setMessage(await message.text());
        } catch (error: unknown) {
            setMessage('');
        }
    }

    useEffect(() => {
        fetchBackend();
    }, [])

    return (
        <>
            <BasicNavigation />
            <h3 className="text-3xl font-bold dark:text-white">Message from the backend: </h3><h1 className="text-5xl font-extrabold dark:text-white">{message}</h1>
            <Button>shadcn btn</Button>
        </>
    )
}

export default Demo;