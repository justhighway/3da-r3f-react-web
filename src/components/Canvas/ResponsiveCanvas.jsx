import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

const ResponsiveCanvas = () => {
  /* useThree 훅을 사용하여 React Three Fiber에서 제공하는
     Three.js의 camera(카메라)와 gl(WebGLRenderer) 객체를 가져옴 
     camera 객체: 씬을 렌더링할 때 사용할 카메라를 나타내고,
     gl 객체: WebGL을 사용하여 씬을 실제로 렌더링 */
  const { camera, gl } = useThree();

  useEffect(
    () => {
      /** 브라우저 창의 크기가 변경될 때 호출됨
       * 이 함수는 카메라의 종횡비(aspect ratio)를 현재 창의 종횡비로 업데이트하고,
       * 카메라의 투영 행렬(projection matrix)을 갱신한 다음,
       * WebGLRenderer의 크기를 현재 창 크기로 설정하여
       * scene이 올바르게 렌더링되도록 함 */
      const handleResize = () => {
        /* window.innerWidth와 window.innerHeight를 사용하여
        현재 창의 너비와 높이를 가져와서 종횡비를 계산 */
        const aspect = window.innerWidth / window.innerHeight;

        // 계산된 종횡비를 카메라의 aspect 속성에 할당
        camera.aspect = aspect;

        /* 카메라의 투영 행렬을 업데이트
        이 과정은 카메라의 속성 변화가 실제 렌더링에 반영되도록 함 */
        camera.updateProjectionMatrix();

        /* WebGLRenderer의 크기를 현재 창의 너비와 높이로 설정
        이를 통해 렌더러가 올바른 해상도로 렌더링할 수 있게 됨 */
        gl.setSize(window.innerWidth, window.innerHeight);
      };

      /* 브라우저 창이 리사이즈될 때마다 handleResize 함수를 호출하도록
       resize 이벤트 리스너 추가 */
      window.addEventListener("resize", handleResize);

      /* 컴포넌트가 처음 마운트될 때 한 번 handleResize 함수를 호출하여
      초기 렌더링 시에도 올바른 크기와 종횡비가 설정되도록 함 */
      handleResize();

      /* 클린업 함수:
      컴포넌트가 언마운트될 때 이벤트 리스너를 제거하여 메모리 누수를 방지 */
      return () => {
        // resize 이벤트 리스너를 제거합니다.
        window.removeEventListener("resize", handleResize);
      };
    },

    /* 의존성 배열:
    camera와 gl 객체가 변경될 때마다 useEffect hook이 다시 실행됨
    여기서는 camera와 gl 값이 변경되지 않지만 명시적으로 포함하여 의존성 관리 */
    [camera, gl]
  );

  /* 이 컴포넌트는 화면에 아무것도 렌더링하지 않기 때문에 null 반환 */
  return null;
};

export default ResponsiveCanvas;
