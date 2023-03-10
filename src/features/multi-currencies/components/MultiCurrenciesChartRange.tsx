import { Dispatch, SetStateAction, useCallback } from 'react';

import CustomDropdown from '@components/CustomDropdown';
import SegmentedSwitch from '@components/SegmentedSwitch';
import { CHART_RANGES } from '@constants/Chart';
import { ChartRanges, ChartRange } from '@interfaces/ICharts';
import {
  useMultiCurrenciesChartRange,
  useMultiCurrenciesActions,
} from '@src/zustand/multiCurrenciesStore';

const MultiCurrenciesChartRange = () => (
  <CustomDropdown>{(props) => <Inside {...props} />}</CustomDropdown>
);

const Inside = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const mutliChartRange = useMultiCurrenciesChartRange();
  const { setMultiCurrenciesChartRange } = useMultiCurrenciesActions();

  const onSegementedSwitchClick = useCallback(
    (item: ChartRanges) => {
      if (!open) setOpen(true);
      else {
        setOpen(false);
        setMultiCurrenciesChartRange(item);
      }
    },
    [setMultiCurrenciesChartRange, setOpen, open],
  );

  const nameExtractor = useCallback((item: ChartRange) => item.name, []);

  return (
    <SegmentedSwitch
      className={`w-max flex-col rounded-sm border transition-all duration-150 ${
        open ? 'h-max' : 'h-10 overflow-hidden'
      }`}
      items={CHART_RANGES}
      activeItem={mutliChartRange}
      nameExtractor={nameExtractor}
      keyExtractor={nameExtractor}
      onClick={onSegementedSwitchClick}
    />
  );
};

export default MultiCurrenciesChartRange;
