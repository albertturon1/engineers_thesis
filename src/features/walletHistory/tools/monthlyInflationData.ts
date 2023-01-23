import { LabelValue } from '@interfaces/ICharts';
import {
  MonthlyInflationRatesRequest,
  Observation,
} from '@src/api/interfaces/IOECDApi';
import { getMonthlyInflationRates } from '@src/api/OECDApi';

const monthlyInflationData = async ({
  startPeriod,
  endPeriod,
}: MonthlyInflationRatesRequest): Promise<LabelValue[]> => {
  const data = await getMonthlyInflationRates({
    startPeriod,
    endPeriod,
  });

  const labels = data.structure.dimensions.observation[0].values;

  const observations =
    data.dataSets[0].series?.['0:0:0:0:0' as '0.0.0.0.0'].observations;

  const series = Object.values(observations).map((e) => (e as Observation)[0]);
  return labels.map((label, index) => ({
    label: label.id,
    value: series[index],
  }));
};

export default monthlyInflationData;
