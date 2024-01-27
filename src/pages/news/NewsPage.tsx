import axios from "axios";
import { useEffect, useState } from "react";
import { NewsProp } from "../../types/NewsProp";
import NewsList from "../../components/news/NewsList";
import { Link, useParams, NavLink } from "react-router-dom";
import '../../styles/NewsPage.scss'
import Loading from "../../components/news/Loading";
import "../../styles/StockGuide.scss"

function NewsPage() {
    const { group } = useParams();
    // console.log(group)

    const [news, setNews] = useState<NewsProp[]>([]);
    // const [economyNews, setEconomyNews] = useState<NewsProp[]>([]);
    // const [stockNews, setStockNews] = useState<NewsProp[]>([]);
    // const [coinNews, setCoinNews] = useState<NewsProp[]>([]);
    const [loading, setLoading] = useState(false)

    const fetchDataFromServer = async () => {
        try {
            let url = process.env.REACT_APP_BACKSERVER + `/news/${group}`

            // // 선택된 li에 따라 url 수정
            // if(selectedGroup !== 'all') {
            //     url += `/${selectedGroup}`
            // }

            // useParams 훅을 통해 동적으로 가져온 그룹 값으로 URL 수정
            // if (group && group !== "economy") {
            //     url += `/${group}`;
            // }

            // Axios를 사용하여 서버에 GET 요청
            await axios
                .get(url)
                .then((res) => {
                    console.log(res.data);
                    setNews(res.data);
                    // setLoading(true) // 로딩창 확인 위해
                    // news = stockNews; // 서버에서 전송한 데이터에 따라 변경

                    // const category1 = res.data.filter((singleNews:NewsProp) => singleNews.group === 1);
                    // // setStockNews(category1);
                    // const category2 = res.data.filter((singleNews:NewsProp) => singleNews.group === 2);
                    // console.log(group);
                    // // setCoinNews(category2);
                    // const category3 = res.data.filter((singleNews:NewsProp) => singleNews.group === 3);
                    // // setEconomyNews(category3);

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

    const refresh = async () => {
        setLoading(true)
        try {
            let url2 = process.env.REACT_APP_BACKSERVER + `/news/get${group}`
            // if(!group) {
            //     url2 +="economy"
            // } else {
            //     url2 += `${group}`
            // }
            const newData = await axios.get(url2);
            // setLoading(false);
            // setNews(newData.data);
            console.log(newData);
            setLoading(false)
            window.location.reload();

        } catch (error) {
            console.error("refresh error:", error);
        }
    };
    

    return (<>
    <div className="outer-wrapper">
        <div>
            {/* <li onClick={()=> groupClick('all')}>전체</li>
            <li onClick={()=> groupClick('economy')}>경제</li>
            <li onClick={()=> groupClick('stock')}>주식</li>
            <li onClick={()=> groupClick('coin')}>코인</li> */}

            <div className="page-title">뉴스룸</div>
                <div className="newsNav">
                    <ul>
                        <li><NavLink to="/news/economy"
                        style={({ isActive }) => {
                            return {
                              color: isActive ? "#0056F3" : "#333",
                            };
                          }}>경제</NavLink></li>
                        <li><NavLink to="/news/stock"
                        style={({ isActive }) => {
                            return {
                              color: isActive ? "#0056F3" : "#333",
                            };
                          }} >주식</NavLink></li>
                        <li><NavLink to="/news/coin"
                        style={({ isActive }) => {
                            return {
                              color: isActive ? "#0056F3" : "#333",
                            };
                          }} >코인</NavLink></li>
                    </ul>
                    <ul className="refresh-btn">
                        <li className="material-symbols-outlined" onClick={refresh}>cached</li>
                    </ul>
                </div>
	<div/>
        </div>

            {loading ? <Loading /> :
            news.map((data: NewsProp, index:number) => {
                return ( <NewsList key={index} data={data}/>
                );
            })}
        </div>

    </>
  );
}

export default NewsPage;
