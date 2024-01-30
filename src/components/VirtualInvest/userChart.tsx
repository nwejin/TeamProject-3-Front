import { ResponsiveLine } from '@nivo/line';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsiveLine = ({ data }: any) => {
  //   const chartData = data;
  //   console.log(chartData);

  const chartData = [
    {
      id: 'japan',
      color: 'hsl(137, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 149,
        },
        {
          x: 'helicopter',
          y: 119,
        },
        {
          x: 'boat',
          y: 251,
        },
        {
          x: 'train',
          y: 95,
        },
        {
          x: 'subway',
          y: 60,
        },
        {
          x: 'bus',
          y: 33,
        },
        {
          x: 'car',
          y: 219,
        },
        {
          x: 'moto',
          y: 36,
        },
        {
          x: 'bicycle',
          y: 93,
        },
        {
          x: 'horse',
          y: 193,
        },
        {
          x: 'skateboard',
          y: 295,
        },
        {
          x: 'others',
          y: 9,
        },
      ],
    },
    {
      id: 'france',
      color: 'hsl(308, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 125,
        },
        {
          x: 'helicopter',
          y: 30,
        },
        {
          x: 'boat',
          y: 200,
        },
        {
          x: 'train',
          y: 247,
        },
        {
          x: 'subway',
          y: 18,
        },
        {
          x: 'bus',
          y: 192,
        },
        {
          x: 'car',
          y: 51,
        },
        {
          x: 'moto',
          y: 62,
        },
        {
          x: 'bicycle',
          y: 6,
        },
        {
          x: 'horse',
          y: 215,
        },
        {
          x: 'skateboard',
          y: 92,
        },
        {
          x: 'others',
          y: 186,
        },
      ],
    },
    {
      id: 'us',
      color: 'hsl(21, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 14,
        },
        {
          x: 'helicopter',
          y: 4,
        },
        {
          x: 'boat',
          y: 269,
        },
        {
          x: 'train',
          y: 250,
        },
        {
          x: 'subway',
          y: 98,
        },
        {
          x: 'bus',
          y: 247,
        },
        {
          x: 'car',
          y: 97,
        },
        {
          x: 'moto',
          y: 227,
        },
        {
          x: 'bicycle',
          y: 286,
        },
        {
          x: 'horse',
          y: 243,
        },
        {
          x: 'skateboard',
          y: 47,
        },
        {
          x: 'others',
          y: 218,
        },
      ],
    },
    {
      id: 'germany',
      color: 'hsl(9, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 73,
        },
        {
          x: 'helicopter',
          y: 64,
        },
        {
          x: 'boat',
          y: 272,
        },
        {
          x: 'train',
          y: 153,
        },
        {
          x: 'subway',
          y: 227,
        },
        {
          x: 'bus',
          y: 130,
        },
        {
          x: 'car',
          y: 297,
        },
        {
          x: 'moto',
          y: 215,
        },
        {
          x: 'bicycle',
          y: 181,
        },
        {
          x: 'horse',
          y: 146,
        },
        {
          x: 'skateboard',
          y: 121,
        },
        {
          x: 'others',
          y: 22,
        },
      ],
    },
    {
      id: 'norway',
      color: 'hsl(306, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 85,
        },
        {
          x: 'helicopter',
          y: 128,
        },
        {
          x: 'boat',
          y: 287,
        },
        {
          x: 'train',
          y: 27,
        },
        {
          x: 'subway',
          y: 71,
        },
        {
          x: 'bus',
          y: 146,
        },
        {
          x: 'car',
          y: 168,
        },
        {
          x: 'moto',
          y: 230,
        },
        {
          x: 'bicycle',
          y: 150,
        },
        {
          x: 'horse',
          y: 97,
        },
        {
          x: 'skateboard',
          y: 200,
        },
        {
          x: 'others',
          y: 52,
        },
      ],
    },
  ];

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
      {/* <ResponsiveLine
        data={chartData}
        margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
        xScale={{ type: 'linear' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        colors={'pink'}
        lineWidth={3}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.15}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      /> */}
    </div>
  );
};

export default MyResponsiveLine;
