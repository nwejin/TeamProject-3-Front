import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  totalItems: number;
  itemCountPerPage: number;
  pageCount: number;
  currentPage: number;
}

function CommunityPagination({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage,
}: Props) {
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState(1);
  const npPrev = start === 1;
  const noNext = start + pageCount - 1 > totalPages;

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => (prev = pageCount));
  }, [currentPage, pageCount, start]);

  return (
    <div>
      <ul>
        <li>
          <Link to={`page-${start - 1}`}>이전</Link>
        </li>
        {[...Array(pageCount)].map((a, i): any => {
          <>
            {start + 1 < totalPages && (
              <li key={i}>
                <Link to={`?page=${start + i}`}>{start + i}</Link>
              </li>
            )}
          </>;
        })}
        <li>
          <Link to={`?page=${start + pageCount}`}>다음</Link>
        </li>
      </ul>
    </div>
  );
}

export default CommunityPagination;
