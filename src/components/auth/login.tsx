import { useState } from "react";
export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="login">
            <h1>Login</h1>
            <form onClick={() => {}} method="post">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}required/>
                <br/>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <br/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}