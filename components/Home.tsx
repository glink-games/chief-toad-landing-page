/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Home.module.scss';
import Countdown from './Countdown';
import JoinUsButton from '../public/assets/misc/button_joinus.png';
import MintNowButton from '../public/assets/misc/button_mintnow.png';
import RegisterButton from '../public/assets/misc/register_button.png';
import socials from '../utils/constants/socials';
import Link from 'next/link';

const Home = () => {
  return (
    <div id='HomeContainer' className={styles.container}>
      <div className={styles.main}>
        {/* <Countdown /> */}
        <h2 className={styles.preMint}>WE&apos;RE MINTED OUT</h2>
        <a
          className={styles.main_cta}
          href={socials[1].href}
          target='_blank'
          rel='noreferrer'
        >
          <img src={JoinUsButton.src} alt='Join us' />
        </a>
        {/* <a
          className={styles.main_cta2}
          href='https://www.premint.xyz/chief-toad-community-list'
          target='_blank'
          rel='noreferrer'
        >
          <img src={RegisterButton.src} alt='Register' />
        </a> */}
        {/* <Link href={'/mint'} passHref>
          <img
            src={MintNowButton.src}
            alt='Join us'
            className={styles.main_cta}
          />
        </Link> */}
      </div>
    </div>
  );
};

export default Home;
