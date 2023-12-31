import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.scss";
import { useEffect, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //現在のスクロール値
  const nowScrollValue = useRef(0);
  //慣性スクロール値
  const inertialScrollValue = useRef(0);
  useEffect(() => {
    const scrollValueEle = document.getElementById("scrollValue");
    const inertialScrollValueElement = document.getElementById(
      "InertialScrollValue"
    );
    const boxEle = document.getElementById("box");
    window.addEventListener("wheel", scrollFunction);

    function scrollFunction(e) {
      nowScrollValue.current += e.deltaY;
      scrollValueEle.textContent = nowScrollValue.current;
    }
    const render = () => {
      requestAnimationFrame(render);
      inertialScrollValue.current +=
        (nowScrollValue.current - inertialScrollValue.current) * 0.05;
      inertialScrollValueElement.textContent =
        inertialScrollValue.current.toFixed(5);
      boxEle.style.transform = `translateY(${inertialScrollValue.current}px)`;
      // console.log(nowScrollValue.current);
    };
    requestAnimationFrame(render);
  }, []);
  return (
    <>
      <Head>
        <title>感性スクロールの検証</title>
        <meta name="description" content="感性スクロールの検証" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles["dev-console"]}>
        <div>
          <span>ScrollValue: </span>
          <span id="scrollValue" className={styles["scroll-value"]}>
            Scroll Value
          </span>
        </div>
        <div>
          <span>InertialScrollValue:</span>
          <span id="InertialScrollValue" className={styles["scroll-value"]}>
            Scroll Value
          </span>
        </div>
      </div>

      <section className={styles["section1"]}>
        <div id="box" className={styles["box"]}></div>
      </section>

      {/* <div id="scrollValue" className={styles["scroll-value"]}>
        Scroll Value
      </div> */}
    </>
  );
}
