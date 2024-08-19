/* eslint-disable react/prop-types */

import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import OfficeRoom from "./OfficeRoom";
import RobotModel from "./RobotModel";
import useCameraPositionLeva from "@hooks/useCameraPositionLeva";
import useCameraRotationLeva from "@hooks/useCameraRotationLeva";

export default function MonitorCloseUp({ section }) {
  const scrollData = useScroll();
  const groupRef = useRef(null);
  const tl = useRef(null); // useRef로 변경

  // 애니메이션이 시작하고 끝나는 스크롤 범위 설정
  const startScroll = 0.1; // 애니메이션 시작 지점
  const endScroll = 1; // 애니메이션 종료 지점

  useCameraPositionLeva();
  useCameraRotationLeva();

  useFrame(() => {
    if (tl.current) {
      // 스크롤 오프셋을 설정한 범위로 클램핑
      const clampedOffset = Math.min(
        Math.max(
          (scrollData.offset - startScroll) / (endScroll - startScroll),
          0
        ),
        1
      );
      tl.current.seek(clampedOffset * tl.current.duration());
    }
  });

  useEffect(() => {
    tl.current = gsap.timeline({
      paused: true, // 타임라인을 일시 정지 상태로 시작
    });

    if (tl.current) {
      // 섹션 2에 해당하는 애니메이션 설정
      tl.current.to(
        groupRef.current.position,
        {
          duration: 5,
          z: 2.0,
          x: 3.6,
        },
        1
      );

      tl.current.to(
        groupRef.current.rotation,
        {
          duration: 5,
          y: 0.8,
          z: 0.02,
        },
        "<"
      );

      // // 섹션 3에도 동일한 애니메이션 적용
      tl.current.to(
        groupRef.current.position,
        {
          duration: 5,
          z: 2.0, // 섹션 2의 z값과 동일하게 유지
          x: 3.6, // 섹션 2의 x값과 동일하게 유지
        },
        7 // 섹션 3 시작 시점을 타임라인에서 설정
      );

      tl.current.to(
        groupRef.current.rotation,
        {
          duration: 5,
          y: 0.8, // 섹션 2의 회전값과 동일하게 유지
          z: 0.02,
        },
        "<"
      );
    }

    return () => {
      if (tl.current) {
        tl.current.kill(); // 타임라인 정리
      }
    };
  }, []);

  return (
    <group ref={groupRef}>
      <OfficeRoom section={section} />
      <RobotModel section={section} />
      <axesHelper />
    </group>
  );
}
