import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";
import { usePadStore } from "@/stores/usePadStore";
import { useLaunchStore } from "@/stores/useLaunchStore";

export default function CustomGlobe() {
  const globeContainerRef = useRef(null);
  const { pads, setSelectedPad } = usePadStore();
  const { launches } = useLaunchStore();

  useEffect(() => {
    if (globeContainerRef.current) {
      const globe = Globe()(globeContainerRef.current)
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
        .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
        .backgroundColor("#000000")
        .width(1000)
        .labelsData(pads)
        .labelLat((d) => d.latitude)
        .labelLng((d) => d.longitude)
        .labelText(() => "")
        .labelSize((d) => (d.status === "active" ? 4.5 : 6))
        .labelDotRadius((d) => (d.status === "active" ? 0.5 : 1))
        .labelColor((d) => (d.isLaunch === true ? "green" : "red"))
        .labelAltitude(0)
        .onLabelClick((d) => {
          console.log("Callback triggered with");
          console.log(d);
          setSelectedPad(d);
        });

      const arcsData = launches
        .filter((launch) => launch.launchpad && launch.cores.some(core => core.landpad))
        .map((launch) => {
          const launchpad = pads.find(pad => pad.id === launch.launchpad);
          const landpad = pads.find(pad => launch.cores.some(core => core.landpad === pad.id));
          return {
            startLat: launchpad.latitude,
            startLng: launchpad.longitude,
            endLat: landpad.latitude,
            endLng: landpad.longitude,
            color: launch.success ? 'green' : 'red',
          };
        });

      globe
        .arcsData(arcsData)
        .arcColor('color')
        .arcDashLength(0.3)
        .arcDashGap(0.1)
        .arcDashAnimateTime(1000);

      return () => {
        globeContainerRef.current.innerHTML = "";
      };
    }
  }, [pads, launches, setSelectedPad]);

  return <div ref={globeContainerRef} style={{ width: "100%", height: "100%", margin: 0 }} />;
}
