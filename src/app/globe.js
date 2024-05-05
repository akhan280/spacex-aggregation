import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";
import { useLaunchpadStore } from "@/stores/useLaunchpadStore";

export default function CustomGlobe() {
  const globeContainerRef = useRef(null);
  const { launchpads, setSelectedLaunch } = useLaunchpadStore();

  useEffect(() => {
    if (globeContainerRef.current) {
      console.log("This is launchpads");
      console.log(launchpads);
      if (launchpads) {
        Globe()
          .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
          .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
          .backgroundColor("#000000")
          .width(1000)
          .labelsData(launchpads)
          .labelLat(d => d.latitude)
          .labelLng(d => d.longitude)
          .labelText(() => "")
          .labelSize(d => d.status === "active" ? 4.5 : 6)
          .labelDotRadius(d => d.status === "active" ? 0.5 : 2)
          .labelColor(d => d.status === "active" ? "green" : "red")
          .labelAltitude(0)
          .onLabelClick(d => {
            console.log("Callback triggered with");
            console.log(d);
            setSelectedLaunch(d);
          })
          (globeContainerRef.current);
      }
      return () => {
        if (globeContainerRef.current) {
          globeContainerRef.current.innerHTML = "";
        }
      };
    }
  }, [launchpads, setSelectedLaunch]);

  return (
    <div ref={globeContainerRef} style={{ width: "100%", height: "100%", margin: 0 }} />
  );
}