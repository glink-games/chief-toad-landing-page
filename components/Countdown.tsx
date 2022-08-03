import useCountdown from '../hooks/useCountdown';
import styles from '../styles/Countdown.module.scss';

const STAGE1_TIMESTAMP = 1657026000000;

const Countdown = () => {
  const [days, hours, minutes, seconds] = useCountdown(STAGE1_TIMESTAMP);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2>
          {days}:{hours}:{minutes}:{seconds}
        </h2>
      </div>
    </div>
  );
};
export default Countdown;
