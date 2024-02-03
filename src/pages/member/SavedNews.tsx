import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import NewsList from '../../components/news/NewsList';
import { useNavigate } from 'react-router-dom';

function SavedNews() {
  const [cookies, setCookie, removeCookie] = useCookies(['jwtCookie']);
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  const getMynews = async () => {
    const tokenId = cookies['jwtCookie'];

    if (!tokenId) {
      alert('로그인 후 사용 가능한 기능입니다.');
      navigate('/signin');
      return;
    } else {
      const myNews = await axios.get(
        process.env.REACT_APP_BACKSERVER + '/news/getMyNews',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      // console.log('-----------',myNews.data.news);
      setNews(myNews.data.news);
    }
  };

  useEffect(() => {
    getMynews();
  }, []);

  return (
    <>
      <div className="outer-wrapper">
        <div className="page-title">저장한 뉴스</div>
        <div className="wordBook-hr"></div>

        {/* {news.length > 0 ? news.map((data, index)=> {
            return (<NewsList key={index} data={data}/>)
        }) : <div>저장한 뉴스가 없습니다.</div>  } */}

        {!cookies['jwtCookie'] ? (
          <div></div>
        ) : (
          <>
            {news.length > 0 ? (
              news.map((data, index) => <NewsList key={index} data={data} />)
            ) : (
              <div>저장한 뉴스가 없습니다.</div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default SavedNews;
