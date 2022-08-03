/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';

import Meta from '../components/Meta';
import styles from '../styles/Main.module.scss';

import Navigation from '../components/Navigation';
import Home from '../components/Home';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import Content from '../components/Content';

const Index: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <Meta />
        <Navigation />

        <main className={styles.main}>
          <Home />
          <Gallery />
          <Content />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Index;
