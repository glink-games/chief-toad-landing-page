/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Gallery.module.scss';
import NFT1 from '../public/assets/nft/image_1.png';
import NFT2 from '../public/assets/nft/image_2.png';
import NFT3 from '../public/assets/nft/image_3.png';
import NFT4 from '../public/assets/nft/image_4.png';

const Gallery = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <img src={NFT1.src} alt='NFT 1' />
        <img src={NFT2.src} alt='NFT 2' />
        <img src={NFT3.src} alt='NFT 3' />
        <img src={NFT4.src} alt='NFT 4' />
      </div>
    </div>
  );
};

export default Gallery;
