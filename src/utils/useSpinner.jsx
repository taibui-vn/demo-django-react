import { useState } from "react";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

const useCircularProgress = () => {
  const [processing, setProcessing] = useState(false);

  return {
    component: processing ? <HourglassEmptyIcon /> : undefined,
    processing,
    setProcessing,
  };
};

export default useCircularProgress;
