import axios from "axios";
import { useEffect, useState } from "react";
import { NewsProp } from "../types/NewsProp";
import NewsList from "../components/NewsList";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../styles/NewsPage.scss';

function NewsPage() {
    const { group } = useParams();
    // console.log(group)

    const [news, setNews] = useState<NewsProp[]>([]);
    // const [economyNews, setEconomyNews] = useState<NewsProp[]>([]);
    // const [stockNews, setStockNews] = useState<NewsProp[]>([]);
    // const [coinNews, setCoinNews] = useState<NewsProp[]>([]);

    const fetchDataFromServer = async () => {
        try {
            let url = process.env.REACT_APP_BACKSERVER + "/news"

            // // 선택된 li에 따라 url 수정
            // if(selectedGroup !== 'all') {
            //     url += `/${selectedGroup}`
            // }

            // useParams 훅을 통해 동적으로 가져온 그룹 값으로 URL 수정
            if (group && group !== "economy") {
                url += `/${group}`;
            }

            // Axios를 사용하여 서버에 GET 요청
            await axios
                .get(url)
                .then((res) => {
                    console.log(res.data);
                    setNews(res.data);
                    // news = stockNews; // 서버에서 전송한 데이터에 따라 변경

                    const category1 = res.data.filter((singleNews:NewsProp) => singleNews.group === 1);
                    // setStockNews(category1);
                    const category2 = res.data.filter((singleNews:NewsProp) => singleNews.group === 2);
                    console.log(group);
                    // setCoinNews(category2);
                    const category3 = res.data.filter((singleNews:NewsProp) => singleNews.group === 3);
                    // setEconomyNews(category3);

                    // switch(group) {
                    //     case "economy":
                    //         setNews(category3);
                    //         break;
                    //     case "stock":
                    //         setNews(category1);
                    //         break;
                    //     case "coin":
                    //         setNews(category2);
                    //         break;
                    //     default:
                    //         setNews(res.data)
                    // }
                });
        } catch (error) {
            console.error("Error fetching data from server:", error);
        }
    };
    useEffect(() => {
        // React 컴포넌트가 마운트될 때 한 번 실행
        fetchDataFromServer();
        console.log(group)
    }, [group]
    // []
    );

    // const groupClick =  (group: string) => {
    //     setSelectedGroup(group);
    //     navigate(`/news${group !== "all" ? `/${group}` : "/all"}`);
    // }


// const wordData = wordsDb.find((singleData: WordsProp) => singleData.word === word);

    // const cate1 = () => {
    //     news.find((singleNews:NewsProp) => singleNews.group === 1)
    //         }


    const refresh = async () => {
        try {
            // console.log("Refreshing...");
            await axios.get(process.env.REACT_APP_BACKSERVER + `/news/${group}`);
            // console.log("Refresh complete.");
        } catch (error) {
            console.error("refresh error:", error);
        }
    };
    

    return (<>
    <main>
        <ul className="newsGroup">
            {/* <li onClick={()=> groupClick('all')}>전체</li>
            <li onClick={()=> groupClick('economy')}>경제</li>
            <li onClick={()=> groupClick('stock')}>주식</li>
            <li onClick={()=> groupClick('coin')}>코인</li> */}

            <li className="newsRoom">뉴스룸</li>
            <li><Link to="/news/economy" >경제</Link></li>
            <li><Link to="/news/stock" >주식</Link></li>
            <li><Link to="/news/coin" >코인</Link></li>
        </ul>

        <ul>
            <li className="refresh">새로고침</li>
        </ul>
        
            {news.map((data: NewsProp, index:number) => {
                return ( <NewsList key={index} data={data}/>
                    // <p key={data._id}>
                    //     {data.title} {data.date} <br /> {data.context} <br />
                    // </p>
                );
            })}
        </main>

    </>
        
    );
}

export default NewsPage;
