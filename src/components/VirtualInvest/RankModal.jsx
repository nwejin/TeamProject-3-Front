import { useState, useEffect } from 'react';

const RankModal = ({ data }) => {
  //   console.log(data);
  const [rank, setRank] = useState([]);

  useEffect(() => {
    try {
      setRank(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  console.log(data.index);

  const myRank = rank.findIndex((rank) => rank.userid === data.user) + 1;
  console.log(myRank);

  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '25%',
        height: '60%',
        right: '5.5%',
        bottom: '20%',
        position: 'absolute',
        zIndex: '100',
        backgroundColor: 'white',
        border: '1px solid #d9dadb',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}
      className="userRankBox"
    >
      <div style={{ margin: '0.5rem auto', color: '#0056f3' }}>
        전체 사용자 랭킹
      </div>
      {rank.slice(0, 10).map((data, index) => {
        const myRank =
          rank.findIndex((rank) => rank.userid === data.userid) + 1;
        console.log(myRank);

        const profit = data.profit.toFixed(2);

        return (
          <ul style={{ width: '100%', margin: 0 }}>
            <li
              style={{
                width: 'fit-content',
                display: 'inline-block',
                cursor: 'pointer',
                textAlign: 'center',
                padding: 0,
                marginRight: 0,
                backgroundColor: 'white',
                // marginLeft: '2.5%',
                width: '100%',
                borderBottom: '1px solid #d9dadb',
                paddingBottom: '0.3rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  //   backgroundColor: 'pink',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '85%',
                    // backgroundColor: 'red',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <p style={{ fontSize: '14px', marginRight: '0.5rem' }}>
                    {myRank}.{' '}
                  </p>
                  <p style={{ fontSize: '14px', marginRight: '0.5rem' }}>
                    {data.userid}
                  </p>
                  <p style={{ fontSize: '12px', color: '#808080' }}>
                    {' '}
                    누적 수익 {profit} $
                  </p>
                </div>
                {/* <div style={{ width: '15%' }}>
                  <p style={{ fontSize: '10px' }}> {data.win}승 </p>
                </div> */}
              </div>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default RankModal;
