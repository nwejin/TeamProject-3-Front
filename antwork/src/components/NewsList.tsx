import { Link } from "react-router-dom";
import { NewsProp } from "../types/NewsProp";
import '../styles/NewsPage.scss';

interface NewsListProp {
    data: NewsProp;
  }

function NewsList({data}: NewsListProp) {
    // console.log('data >',data)
    return ( <>
     <Link to={`/news/detail/${data._id}`} state={{data}}>
         <article>
            <img src={data.smallimg} alt="no img" />
            <div>
                <h3>{data.title}</h3>
                <p>{data.content}</p>
            </div>
         </article>
     </Link>
    </> );
}

export default NewsList;