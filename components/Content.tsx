/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Content.module.scss';
import MainImage from '../public/assets/misc/main.png';

const paraContent = [
  'The point that we are making here is that - at Chief Toad, we still believe that NFTs should bring utility.',
  'That’s why we are “killing” pepe - killing “anti-utility”',
  'We know that there is a recent tide of meme NFTs with no utility nor roadmap. We understand and fully embrace this fun side of NFTs.',
  'However, we have analysed why meme NFTs are popping off while NFTs that “deserves to m00n” are tanking',
  'Everyone is tired of NFT projects promising things - that don’t happen or take too long to deliver.',
  'A lot of utility is tied to “merch” and well..that isn’t utility lol - worse, the only utility is the floor price utilities of chief toad',
  'No more years of waiting for things to happen. The utility is now and right in our hands. Join our Discord to find out more',
];

const utilsContent = [
  'At G-LInk, we are fortunate enough to have resources to have already built up a team of game developers. Our games are already in beta and you can see the game previews right now.',
  'IDO in August and games will be released in September.',
  'No more years of waiting for things to happen. The utility is now and right in our hands.',
];

const Content = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.main_sub}>
          <div className={styles.main_section}>
            <h2>#DEATHTOPEPE</h2>
            <img src={MainImage.src} alt='Main Image' />
          </div>

          <div className={styles.main_section}>
            <h3>Why we are killing off the world’s favourite meme?</h3>
            <ul>
              {paraContent.map((item, index: number) => (
                <li key={`Content_${index}`}>{item}</li>
              ))}
            </ul>
          </div>
          {/* 
          <div className={styles.main_section}>
            <h3>utilities of chief toad</h3>
            <ul>
              {utilsContent.map((item, index: number) => (
                <li key={`Utils_${index}`}>{item}</li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Content;
