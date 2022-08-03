import styles from '../styles/Layout.module.scss';

const Layout = ({ children }: { children: any }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
