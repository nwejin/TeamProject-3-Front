import '../styles/Community.scss';

function Community() {
  return (
    <div
      style={{
        width: '1000px',
        height: '250px',
        display: 'flex',
        justifyContent: 'center',
        border: '1px solid black',
        borderRadius: '10px',
        alignContent: 'space-around',
        marginBottom: '30px',
      }}
    >
      {/* 글 부분 */}
      <div
        style={{
          width: '80%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        {/* 프로필 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '30px',
          }}
        >
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/ko/thumb/a/ae/Chelsea_FC_Logo.svg/1200px-Chelsea_FC_Logo.svg.png"
              alt=""
              style={{ width: 'auto', height: '20px', marginRight: '6px' }}
            />
            <p> 작성자</p>
          </a>
          <span>•</span>
          <span>10분전</span>
        </div>

        {/* 게시글 표시 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: 'red',
          }}
        >
          <div style={{ width: '80%' }}>
            <a href="">
              <p
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: '18px',
                  fontWeight: '700',
                }}
              >
                안녕하세요, 처음 인사드립니다.
              </p>
              <p
                style={{
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                  whiteSpace: 'normal',
                  lineHeight: '1.4',
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus
                aut fugiat iusto, voluptatem a sequi est rerum. Praesentium
                architecto alias dolorum, adipisci voluptas officiis, quae Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Doloremque
                similique voluptatibus hic ullam veniam minus ex non nulla
              </p>
            </a>
          </div>

          <div style={{ width: '100px', height: '100px' }}>
            <a href="">
              <img
                src="https://upload.wikimedia.org/wikipedia/ko/thumb/a/ae/Chelsea_FC_Logo.svg/1200px-Chelsea_FC_Logo.svg.png"
                alt=""
                style={{ width: '100%', height: 'auto' }}
              />
            </a>
          </div>
        </div>

        {/* 아이콘 리스트 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

            height: '30px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '150px',
            }}
          >
            <span>
              <button>좋아요</button>
              <span>0</span>
            </span>

            <span>
              <button>댓글</button>
              <span>0</span>
            </span>
          </div>
          <span
            style={{
              border: '1px solid black',
              padding: '4px 8px',
              borderRadius: '6px',
              marginRight: '2px',
            }}
          >
            경제
          </span>
        </div>
      </div>
    </div>
  );
}

export default Community;
