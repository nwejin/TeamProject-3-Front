import axios from "axios";
import { useEffect, useState } from "react";
import { NewsProp } from "../types/NewsProp";
import NewsList from "../components/NewsList";


function NewsPage() {
    const [stock, setStock] = useState<NewsProp[]>([]);
    const fetchDataFromServer = async () => {
        try {
            // Axios를 사용하여 서버에 GET 요청
            await axios
                .get(process.env.REACT_APP_BACKSERVER + "/news")
                .then((res) => {
                    console.log(res.data);
                    setStock(res.data);
                    // stock = stockNews; // 서버에서 전송한 데이터에 따라 변경
                });
        } catch (error) {
            console.error("Error fetching data from server:", error);
        }
    };
    useEffect(() => {
        // React 컴포넌트가 마운트될 때 한 번 실행
        fetchDataFromServer();
    }, []);
    return (<>
        <ul>
            <li>전체</li>
            <li>경제</li>
            <li>주식</li>
            <li>코인</li>
        </ul>
        <div>
            {stock.map((data) => {
                return ( <NewsList key={data._id} data={data}/>
                    // <p key={data._id}>
                    //     {data.title} {data.date} <br /> {data.context} <br />
                    // </p>
                );
            })}
        </div>
    </>
        
    );
}

export default NewsPage;
