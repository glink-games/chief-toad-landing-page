/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Footer.module.scss';
import NFTCalendar from '../public/assets/misc/nftcalendar.png';
import RaritySniper from '../public/assets/misc/raritysniper.png';

const RaritySniperURL = 'https://raritysniper.com/chief-toad';
const NFTCalendarURL = 'https://nftcalendar.io/event/chief-toad/';

const Footer = () => {
  return (
    <div id='FooterContainer' className={styles.container}>
      <div className={styles.main}>
        <a href={RaritySniperURL} target='_blank' rel='noreferrer'>
          <img src={RaritySniper.src} alt='RaritySniper' />
        </a>
        <a href={NFTCalendarURL} target='_blank' rel='noreferrer'>
          <img src={NFTCalendar.src} alt='NFTCalendar' />
        </a>
      </div>
    </div>
  );
};

export default Footer;
