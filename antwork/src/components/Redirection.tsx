import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Redirection = () => {
    const code = new URL(document.location.toString()).searchParams.get("code");
    const navigate = useNavigate();

    useEffect(() => {
        console.log(process.env.REACT_APP_BACKSERVER);
        axios
            .post(process.env.REACT_APP_BACKSERVER + "/kakao/code", {
                code: code,
            })
            .then((r) => {
                console.log(r.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return <div>로그인 상태입니다</div>;
};

export default Redirection;
