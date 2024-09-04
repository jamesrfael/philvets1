import React, { useRef, useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import styled from "styled-components";

const data = [
  { name: "Sun", revenue: 4000, cost: 2400 },
  { name: "Mon", revenue: 3000, cost: 1398 },
  { name: "Tue", revenue: 2000, cost: 9800 },
  { name: "Wed", revenue: 2780, cost: 3908 },
  { name: "Thu", revenue: 1890, cost: 4800 },
  { name: "Fri", revenue: 2390, cost: 3800 },
  { name: "Sat", revenue: 3490, cost: 4300 },
];

const RevenueGraph = ({
  titleFontSize = "1rem",
  titleFontWeight = 400,
  axisFontSize = "0.8rem",
  axisFontWeight = 400,
  legendFontSize = "0.8rem",
  legendFontWeight = 400,
  chartHeight = 400,
  chartMargin = { top: 5, right: 30, left: 20, bottom: 5 },
}) => {
  const graphCardRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [timeFrame, setTimeFrame] = useState("Week");

  useEffect(() => {
    const handleResize = () => {
      if (graphCardRef.current) {
        setChartWidth(graphCardRef.current.offsetWidth - 40); // Subtracting padding/margin
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  return (
    <GraphCard ref={graphCardRef}>
      <GraphTitle fontSize={titleFontSize} fontWeight={titleFontWeight}>Revenue Graph</GraphTitle>
      <LegendDropdownContainer>
        <LegendWrapper>
          <Legend fontSize={legendFontSize} fontWeight={legendFontWeight} />
        </LegendWrapper>
        <TimeFrameDropdown onChange={handleTimeFrameChange} value={timeFrame}>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </TimeFrameDropdown>
      </LegendDropdownContainer>
      <TimeFrameIndicator>{timeFrame}</TimeFrameIndicator>
      <GraphContainer>
        <LineChart
          width={chartWidth}
          height={chartHeight}
          data={data}
          margin={chartMargin}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={axisFontSize} fontWeight={axisFontWeight} interval={0}>
          </XAxis>
          <YAxis fontSize={axisFontSize} fontWeight={axisFontWeight} />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#4037e1" />
          <Line type="monotone" dataKey="cost" stroke="#07b64a" />
          <Legend />
        </LineChart>
      </GraphContainer>
    </GraphCard>
  );
};

const GraphCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 70%;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LegendDropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 10px;
`;

const TimeFrameDropdown = styled.select`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
`;

const GraphContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const GraphTitle = styled.h3`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  margin-bottom: 10px;
`;

const TimeFrameIndicator = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  margin-top: 10px;
`;

const LegendWrapper = styled.div`
  display: inline-block;
  text-align: center;
`;

export default RevenueGraph;
