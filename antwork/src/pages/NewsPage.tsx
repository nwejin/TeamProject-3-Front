import axios from "axios";
import { useEffect, useState } from "react";
import { NewsProp } from "../types/NewsProp";
import NewsList from "../components/NewsList";
import { useNavigate } from "react-router-dom";


function NewsPage() {
    const [news, setNews] = useState<NewsProp[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<string>('')
    const navigate = useNavigate();

    const fetchDataFromServer = async () => {
        try {
            let url = process.env.REACT_APP_BACKSERVER + "/news"

            // 선택된 li에 따라 url 수정
            if(selectedGroup !== 'all') {
                url += `/${selectedGroup}`
                
            }

            // Axios를 사용하여 서버에 GET 요청
            await axios
                .get(url)
                .then((res) => {
                    console.log(res.data);
                    setNews(res.data);
                    // stock = stockNews; // 서버에서 전송한 데이터에 따라 변경
                });
        } catch (error) {
            console.error("Error fetching data from server:", error);
        }
    };
    useEffect(() => {
        // React 컴포넌트가 마운트될 때 한 번 실행
        fetchDataFromServer();
    }, [selectedGroup]);

    const groupClick = (group: string) => {
        setSelectedGroup(group);
        navigate(`/news${group !== '' ? `/${group}` : ''}`);  // 그룹을 선택하면 URL을 업데이트
    }
    return (<>
        <ul>
            <li onClick={()=> groupClick('all')}>전체</li>
            <li onClick={()=> groupClick('economy')}>경제</li>
            <li onClick={()=> groupClick('stock')}>주식</li>
            <li onClick={()=> groupClick('coin')}>코인</li>
        </ul>

        <div>
            {news.map((data: NewsProp) => {
                return ( <NewsList key={data.url} data={data}/>
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
