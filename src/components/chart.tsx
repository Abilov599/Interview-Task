import { useState } from "react";
import { styled } from "@mui/material/styles";
import { startOfYesterday, sub } from "date-fns";
import { Button, Box, Container, Typography } from "@mui/material";
import { ChartDataItem } from "../models";
import Graph from "./graph";

const ChartWrapper = styled(Container)({
  height: "100vh",
  paddingTop: "10vh",
});

const TotalViews = styled(Typography)({
  color: "#BCC5CC",
  fontWeight: "bold",
});

const ViewsNumber = styled("span")({
  color: "#000000",
  fontWeight: "bold",
});

const PeriodButton = styled(Button)(({ active }: { active: boolean }) => ({
  color: active ? "#FFFFFF" : "#000000",
  fontWeight: "bold",
  backgroundColor: active ? "#000000" : "transparent",
  borderRadius: 12,
  marginRight: 20,
  "&:hover": {
    backgroundColor: "#EEEEEE",
    color: "#000000",
  },
}));

interface ChartProps {
  data: ChartDataItem[];
  changePeriod: (startDate: Date | null) => void;
}

enum Period {
  ONE_DAY = "Day",
  ONE_WEEK = "Week",
  ONE_MONTH = "Month",
  ONE_YEAR = "Year",
  ALL_TIME = "All",
}

const Chart = ({ data, changePeriod }: ChartProps) => {
  const [activePeriod, setActivePeriod] = useState(Period.ALL_TIME);

  function handleChangePeriod(period: Period) {
    let startDate: Date | null = null;

    switch (period) {
      case Period.ONE_DAY:
        startDate = startOfYesterday();
        break;

      case Period.ONE_WEEK:
        startDate = sub(new Date(), { weeks: 1 });
        break;

      case Period.ONE_MONTH:
        startDate = sub(new Date(), { months: 1 });
        break;

      case Period.ONE_YEAR:
        startDate = sub(new Date(), { years: 1 });
        break;

      case Period.ALL_TIME:
        break;

      default:
        break;
    }

    changePeriod(startDate);
    setActivePeriod(period);
  }

  const totalViews = data.reduce((acc, datum) => acc + datum.views, 0);

  return (
    <ChartWrapper>
      <TotalViews>
        <ViewsNumber>{totalViews}</ViewsNumber> page views
      </TotalViews>
      <Graph data={data} />
      <Box>
        {Object.values(Period).map((period) => (
          <PeriodButton
            key={period}
            active={activePeriod === period}
            onClick={() => handleChangePeriod(period)}
          >
            {period}
          </PeriodButton>
        ))}
      </Box>
    </ChartWrapper>
  );
};
export default Chart;
