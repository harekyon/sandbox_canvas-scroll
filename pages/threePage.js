import Head from "next/head";
import styles from "./ThreePage.module.scss";
import { useEffect, useRef } from "react";
// import { ThreeView } from "@/components/ThreeView";
import * as THREE from "three";

export default function ThreePage() {
  //現在のスクロール値
  const nowScrollValue = useRef(0);
  //慣性スクロール値
  const inertialScrollValue = useRef(0);
  //touch系
  const nowTouchPoint = useRef(0);
  //スクロール方法
  const scrollMethod = useRef(null);
  useEffect(() => {
    //スクロール系のDOM取得
    const scrollValueEle = document.getElementById("scrollValue");
    //スクロールで発火

    window.addEventListener("wheel", scrollFunction);
    function scrollFunction(e) {
      nowScrollValue.current += e.deltaY;
      scrollValueEle.textContent = nowScrollValue.current;
    }
    window.addEventListener("touchstart", touchStartFunction);
    function touchStartFunction(e) {
      nowTouchPoint.current = e.touches[0].pageY;
    }
    window.addEventListener("touchmove", touchEndFunction);
    function touchEndFunction(e) {
      // if (scrollMethod !== "touch") {
      //   scrollMethod.current = "touch";
      // }
      const diff = e.touches[0].pageY - nowTouchPoint.current;
      nowTouchPoint.current = e.touches[0].pageY;
      nowScrollValue.current += diff * 2;
    }

    //レンダリング関数
    const render = () => {
      requestAnimationFrame(render);
      // inertialScrollValue.current +=
      //   (nowScrollValue.current - inertialScrollValue.current) * 0.05;
      // inertialScrollValueElement.textContent =
      //   inertialScrollValue.current.toFixed(5);
      // boxEle.style.transform = `translateY(${inertialScrollValue.current}px)`;
      // console.log(nowScrollValue.current);
    };
    requestAnimationFrame(render);
  }, []);
  useEffect(() => {
    console.log("run");
    const inertialScrollValueElement = document.getElementById(
      "InertialScrollValue"
    );
    // const camera = new THREE.PerspectiveCamera(
    //   70,
    //   window.innerWidth / window.innerHeight,
    //   0.01,
    //   10
    // );
    // const camera = new THREE.OrthographicCamera(
    //   -800,
    //   +800,
    //   (800 * height) / width,
    //   (-800 * height) / width,
    //   0,
    //   2000
    // );
    // const camera = new THREE.OrthographicCamera(-100, +100, 100, -100, 1, 1000);
    const camera = new THREE.PerspectiveCamera(100, 534 / 904, 1, 100, 1, 200);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    document.getElementById("__next").appendChild(renderer.domElement);

    // animation

    function animation(time) {
      // 感性スクロール
      const inertialDiff = scrollMethod.current === "touch" ? 0.03 : 0.05;
      inertialScrollValue.current +=
        (nowScrollValue.current - inertialScrollValue.current) * inertialDiff;
      // inertialScrollValueElement.textContent =
      //   inertialScrollValue.current.toFixed(5);
      // Three.js
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;
      // console.log(camera.position.y);
      camera.position.y = inertialScrollValue.current.toFixed(5) / 1000;

      renderer.render(scene, camera);
    }
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
        {/* <div id="box" className={styles["box"]}></div> */}
      </section>

      {/* <div id="scrollValue" className={styles["scroll-value"]}>
        Scroll Value
      </div> */}
    </>
  );
}
