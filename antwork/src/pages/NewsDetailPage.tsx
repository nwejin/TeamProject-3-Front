// import { NewsProp } from "../types/NewsProp";
// export interface NewsListProps {
//     data: NewsProp;
//   }

import { useLocation } from 'react-router-dom';

function NewsDetailPage() {
    const location = useLocation()
    console.log(location)
    const data = location.state.data
    return ( <>
    <h1>{data.title}</h1>
    <p>{data.date}</p>
    <img src={data.bigimg} alt="" />
    <p>{data.context}</p>
    </> );
}

export default NewsDetailPage;