import { useState, useEffect } from 'react';

const RankModal = ({ data }) => {
  //   console.log(data);
  const [rank, setRank] = useState([]);

  console.log('rank', rank);

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
        border: '1px solid #d9dadb',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}
      className="userRankBox"
    >
      <div style={{ margin: '0.5rem auto', color: '#0056f3' }}>top 5 랭킹</div>
      <div style={{ display: 'flex' }}>
        {rank.slice(0, 3).map((data, index) => {
          const myRank =
            rank.findIndex((rank) => rank.userid === data.userid) + 1;
          console.log(myRank);

          const profit = data.profit.toFixed(2);

          return (
            <div
              style={{
                textAlign: 'center',
                backgroundColor: 'blue',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  //   backgroundColor: 'black',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '85%',
                    height: '100%',
                    backgroundColor: 'red',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <p style={{ fontSize: '14px', marginRight: '0.5rem' }}>
                    {myRank}.{' '}
                  </p>
                  <div
                    style={{
                      backgroundColor: 'gray',
                      width: '50%',
                      height: '50%',
                      borderRadius: '50%',
                    }}
                  >
                    <img className="userImg" src={data.profile} alt="" />
                  </div>
                  <p style={{ fontSize: '14px', marginRight: '0.5rem' }}>
                    {data.userid}
                  </p>
                  {/* <p style={{ fontSize: '12px', color: '#808080' }}>
                  {' '}
                  누적 수익 {profit} $
                </p> */}
                </div>
                {/* <div style={{ width: '15%' }}>
                  <p style={{ fontSize: '10px' }}> {data.win}승 </p>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
      {rank.slice(3, 5).map((data, index) => {
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
                backgroundColor: 'blue',
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
