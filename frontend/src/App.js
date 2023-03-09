import './App.css';
import {useState, useEffect} from "react";
import axios from "axios";
function App() {

    const [password, setPassword] = useState();
    const [inputValue, setInputValue] = useState("");
    const[cansubmit, setCanSubmit] = useState(true);
    const[lower, setLower] = useState(false);
    const[upper, setUpper] = useState(false);
    const[numeric, setNumeric] = useState(false);
    const[length, setLength] = useState(false);
    const[cons, setCons] = useState(false);
    const[special, setSpecial] = useState(false);
    const checkPassword = (event) => {
        const pass = event.target.value;
        const lowerRegex = new RegExp("^(?=.*[a-z])");
        const upperRegex = new RegExp("^(?=.*[A-Z])");
        const numericRegex = new RegExp("^(?=.*[0-9])");
        const consecutiveRegex = new RegExp('^(([a-zA-Z0-9])\\2?(?!\\2))+$');
        const lengthRegex = new RegExp('^(?=.{6,20}$)');
        const specialRegex = new RegExp("^(?=.*[$&+,:;=?@#|'<>.^*()%!-])");
        setLength(lengthRegex.test(pass));
        setNumeric(numericRegex.test(pass));
        setUpper(upperRegex.test(pass));
        setLower(lowerRegex.test(pass));
        setCons(consecutiveRegex.test(pass));
        setSpecial(specialRegex.test(pass));
        setInputValue(pass);
    };


    const handleSubmit = () => {
        axios.post("http://127.0.0.1:4000", {"password": inputValue}).then((data) => {
            setLength(false);
            setNumeric(false);
            setUpper(false);
            setLower(false);
            setCons(false);
            setSpecial(false);
            setInputValue("");
        });
    };

    useEffect(() => {
        if (lower && upper && numeric && cons && length && !special)
        {
            setCanSubmit(false);
            setPassword("Strong");
        } else if (lower && upper && numeric && !cons && length && !special) {
            setCanSubmit(false);
            setPassword("Moderate");
        } else if (!lower && !upper && !numeric) {
            setCanSubmit(true);
            setPassword("");
        } else {
            setCanSubmit(true);
            setPassword("week");
        }
    }, [numeric, upper, lower, cons, length, password, special]);

    return (
            <div className="App">
                <div>
                    <p><label htmlFor="password">Password: </label></p>
                    <p><input type="text" name="password" onChange={checkPassword} value={inputValue}/></p>
                    <label style={{color: lower ? "green" : "#ccc", fontSize: "13px"}}>lowercase</label>&nbsp;
                    <label style={{color: upper ? "green" : "#ccc", fontSize: "13px"}}>uppercase</label>&nbsp;
                    <label style={{color: numeric ? "green" : "#ccc", fontSize: "13px"}}>numbers</label>
                </div>
                <p>{password}</p>
                <button disabled={cansubmit} onClick={handleSubmit}>Submit</button>            
            </div>
            );
}

export default App;
