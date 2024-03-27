import { useEffect, useState } from "react";
import { getMemoizedDataForPeriod } from "../helpers";
import { ChartDataItem } from "../models";

import Chart from "./chart";

const DataVisualizer = () => {
  const [period, setPeriod] = useState<Date | null>(null);
  const [data, setData] = useState<ChartDataItem[]>(
    getMemoizedDataForPeriod(null)
  );

  useEffect(() => {
    const startDate = period ? period.toDateString() : null;

    setData(getMemoizedDataForPeriod(startDate));
  }, [period]);

  return <Chart data={data} changePeriod={setPeriod} />;
};

export default DataVisualizer;
