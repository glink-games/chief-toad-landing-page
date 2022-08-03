import { useEffect, useState } from 'react';

const useCountdown = (targetTime: number) => {
  const [countDown, setCountDown] = useState(targetTime - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(targetTime - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  if (countDown === Infinity) return ['-', '-', '-', '-'];
  if (countDown < 0) return ['0', '00', '00', '00'];

  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  let _days = String(days);
  let _hours = String(hours);
  let _minutes = String(minutes);
  let _seconds = String(seconds);

  if (_seconds.length < 2) {
    _seconds = '0'.concat(_seconds);
  }
  if (_minutes.length < 2) {
    _minutes = '0'.concat(_minutes);
  }
  if (_hours.length < 2) {
    _hours = '0'.concat(_hours);
  }

  return [_days, _hours, _minutes, _seconds];
};

export default useCountdown;
