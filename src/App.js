import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import { Layout } from 'antd';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    theme: 'default', // 'dark',
    data: data
      .slice(data.length - 90, data.length)
      .filter((item) => item.category === 'Gas fuel' || item.category === 'Cement production'),
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    xAxis: {
      nice: true,
      label: {
        rotate: Math.PI / 6,
        offset: 10,
        style: {
          fill: '#aaa',
          fontSize: 12,
        },
        formatter: (name) => name,
      },
      title: {
        text: 'KAKA',
        style: {
          fontSize: 16,
        },
      },
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      tickLine: {
        style: {
          lineWidth: 2,
          stroke: '#aaa',
        },
        length: 5,
      },
      grid: {
        line: {
          style: {
            stroke: '#ddd',
            lineDash: [4, 2],
          },
        },
        alternateColor: 'rgba(0,0,0,0.05)',
      },
    },
    yAxis: {
      label: {
        autoRotate: false,
        style: {
          fill: '#aaa',
          fontSize: 12,
        },
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
      title: {
        text: 'haha',
        style: {
          fontSize: 16,
        },
      },
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      tickLine: {
        style: {
          lineWidth: 2,
          stroke: '#aaa',
        },
        length: 5,
      },
      grid: {
        line: {
          style: {
            stroke: '#ddd',
            lineDash: [4, 2],
          },
        },
        alternateColor: 'rgba(0,0,0,0.05)',
      },
    },
    label: {
      layout: [
        {
          type: 'hide-overlap',
        },
      ],
      style: {
        textAlign: 'right',
      },
      formatter: (item) => item.value,
    },
    point: {
      size: 5,
      style: {
        lineWidth: 1,
        fillOpacity: 1,
      },
      shape: (item) => {
        if (item.category === 'Cement production') {
          return 'circle';
        }

        return 'diamond';
      },
    },
    
    legend: {
      position: 'top-right',
      itemName: {
        style: {
          fill: '#000',
        },
        formatter: (name) => name,
      },
    },
    
  };

  return <Layout className="site-layout" style={{ margin: 200 }}><Line {...config} /></Layout>;
};
export default App;
