import FormInput from "./components/FormInput"
import "./app.css"
import { useState } from "react"

const App = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [fullName, setFullName] = useState("")
    const [password, setPassowrd] = useState("")
    // console.log(username)

    function handleSubmit(event) {
        console.log("Form Submitted")
        event.preventDefault() // This will prevent the webpage from refreshing each time we click on the "Submit" button.
        console.log(username)
        const data = new FormData(event?.target)
        console.log(Object.fromEntries(data?.entries()))
    }


    return (
        <div className="app">
            <form className="login-form" onSubmit={handleSubmit}>
                <FormInput placeholder="Username" setUsername={setUsername} name="username"/>
                <FormInput placeholder="Email" setUsername={setEmail} name="Email"/>
                <FormInput placeholder="FullName" setUsername={setFullName} name="FullName"/>
                <FormInput placeholder="Password" setUsername={setPassowrd} name="Password"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default App