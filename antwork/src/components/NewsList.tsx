import { Link } from "react-router-dom";
import { NewsProp } from "../types/NewsProp";

interface NewsListProps {
    data: NewsProp;
  }

function NewsList({data}:NewsListProps) {
    console.log(data)
    return ( <>
     <Link to={`/news/${data._id}`} state={{data}}>
         <div>
            <img src={data.smallimg} alt={data.title} />
            <div>
                <h3>{data.title}</h3>
                <p>{data.context}</p>
            </div>
         </div>
     </Link>
    </> );
}

export default NewsList;