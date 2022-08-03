import styles from '../styles/Navigation.module.scss';
import socials from '../utils/constants/socials';
import { getIconSvg } from '../utils';

const Navigation = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.main}>
        <ul className={styles.nav_social}>
          {socials.map((item) => {
            return (
              <li key={`Navigation_Social_${item.name}`}>
                <a href={item.href} target='_blank' rel='noreferrer'>
                  <>{getIconSvg(item.icon)}</>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
