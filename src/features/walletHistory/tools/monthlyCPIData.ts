import { LabelValue } from '@interfaces/ICharts';
import { MonthlyInflationRatesRequest } from '@src/api/interfaces/IOECDApi';
import { getMonthlyCPI } from '@src/api/OECDApi';
import normalizOECDData from '@utils/normalizOECDData';

const monthlyInflationData = async ({
  startPeriod,
  endPeriod,
}: MonthlyInflationRatesRequest): Promise<LabelValue[]> => {
  const data = await getMonthlyCPI({
    startPeriod,
    endPeriod,
  });

  return normalizOECDData(data);
};

export default monthlyInflationData;