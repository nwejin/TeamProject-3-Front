import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/Component.scss";
import "./styles/Header.scss";
import "./styles/Signin.scss";
import Header from "./components/Header";
// import MainPage from "./pages/MainPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import FindIdPage from "./pages/FindIdPage";
import CommunityMain from "./community/CommunityMain";
import axios from "axios";
// import ExampleComponent from "./components/ExampleComponent";

function App() {
    const [serverData, setServerData] = useState("");
    useEffect(() => {
        // React 컴포넌트가 마운트될 때 한 번 실행
        fetchDataFromServer();
    }, []);

    const fetchDataFromServer = async () => {
        try {
            // Axios를 사용하여 서버에 GET 요청
            await axios.get("http://localhost:5000").then((res) => {
                console.log(res.data);
                setServerData(res.data.message); // 서버에서 전송한 데이터에 따라 변경
            });
        } catch (error) {
            console.error("Error fetching data from server:", error);
        }
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={serverData} />
                    <Route path="/signin" element={<SigninPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/findId" element={<FindIdPage />} />

                    {/* <Route path="/stockGuide" element={<MainPage />} /> */}
                    <Route path="/community" element={<CommunityMain />} />
                </Routes>
            </BrowserRouter>
            {/* <ExampleComponent></ExampleComponent> */}
            {/* <div className="class">{serverData}</div> */}
            <div>{serverData}</div>
        </div>
    );
}

export default App;
