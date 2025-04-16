// src/components/GlobeAnimation.tsx
"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Papa from 'papaparse';
// Import specific components from modern Tween.js
import { Tween, Group, Easing, removeAll as removeAllTweens } from '@tweenjs/tween.js';

// --- Define Props Interface ---
interface GlobeAnimationProps {
  mapLineColor?: number | string;
  baseMarkerColor?: number | string;
  beamColor?: number | string; // Base color for the beam gradient
  globeRadius?: number;
  beamLength?: number;
  beamRadius?: number;
  rotationSpeed?: number;
  initialCameraZ?: number;
  pulsePeakScale?: number;
  minDistance?: number; // Make controls configurable too
  maxDistance?: number;
  disableZoom?: boolean;
  disablePan?: boolean;
  enableBeamAnimation?: boolean; // To enable/disable beams
  className?: string; // Allow passing Tailwind classes for the container
}

// --- Default Prop Values (Based on your last working version + adjustments) ---
const defaultProps: Required<Omit<GlobeAnimationProps, 'className'>> = {
    mapLineColor: 0xDEF0F7,       // Default Azure lines
    baseMarkerColor: 0x28B6E2,    // Default Aero dots
    beamColor: 0x28B6E2,          // Default Aero beams
    globeRadius: 1.0,
    beamLength: 0.4,              // Your last value
    beamRadius: 0.015,            // Your last value
    rotationSpeed: 0.0005,
    initialCameraZ: 2.0,          // Your last value
    pulsePeakScale: 2.0,
    minDistance: 0.4,             // Your last value
    maxDistance: 10,              // Your last value
    disableZoom: true,
    disablePan: true,
    enableBeamAnimation: true,   // Default to TRUE (beams on)
};

const GlobeAnimation: React.FC<GlobeAnimationProps> = (props) => {
  // Merge passed props with defaults
  const config = { ...defaultProps, ...props };

  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();
  const intervalId = useRef<NodeJS.Timeout>();
  // Use ref for tween group to persist across renders if component re-renders
  const tweenGroup = useRef(new Group());

  useEffect(() => {
    // === Essential Checks ===
    if (!mountRef.current) { console.error("GlobeAnimation: Mount ref not available"); return; }
    if (mountRef.current.childElementCount > 0) { console.log("GlobeAnimation: Already initialized."); return; }
    const currentMountRef = mountRef.current; // Capture ref value

    console.log("GlobeAnimation: Initializing with config:", config);

    // === Basic Scene Setup ===
    const scene = new THREE.Scene();
    const globeGroup = new THREE.Group(); scene.add(globeGroup);
    const camera = new THREE.PerspectiveCamera(75, currentMountRef.clientWidth / currentMountRef.clientHeight, 0.1, 1000);
    camera.position.z = config.initialCameraZ; // Use prop

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMountRef.clientWidth, currentMountRef.clientHeight);
    currentMountRef.appendChild(renderer.domElement);

    // === Controls ===
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.05;
    controls.minDistance = config.minDistance; // Use prop
    controls.maxDistance = config.maxDistance; // Use prop
    controls.target.set(0, 0, 0);
    controls.enablePan = !config.disablePan;     // Use prop
    controls.enableZoom = !config.disableZoom;   // Use prop

    // === Lighting ===
    const ambientLight = new THREE.AmbientLight(0x808080); scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); directionalLight.position.set(5, 5, 5); scene.add(directionalLight);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5); directionalLight2.position.set(-5, -5, -5); scene.add(directionalLight2);

    // === Coordinate Conversion Function (Corrected) ===
    const lonLatToVector3 = (lon: number, lat: number, radius: number): THREE.Vector3 => { const x=radius*Math.cos(lat*Math.PI/180)*Math.cos(lon*Math.PI/180); const y=radius*Math.sin(lat*Math.PI/180); const z=-(radius*Math.cos(lat*Math.PI/180)*Math.sin(lon*Math.PI/180)); return new THREE.Vector3(x,y,z); };

    // === Map Outlines (Uses prop color) ===
    const mapMaterial = new THREE.LineBasicMaterial({ color: config.mapLineColor });
    fetch('/ne_110m_land.geojson').then(r => r.ok ? r.json() : Promise.reject(`HTTP ${r.status}`)).then(geojsonData => {
        const linesGroup = new THREE.Group(); /* ... process geojson ... */
        geojsonData.features.forEach((f:any)=>{if(!f.geometry)return; const c=f.geometry.coordinates; const t=f.geometry.type; const p=(poly:any[][])=>{poly.forEach(r=>{const vr=r.filter((c:any[])=>Array.isArray(c)&&c.length===2&&typeof c[0]==='number'&&typeof c[1]==='number'); if(vr.length<2)return; const pts:THREE.Vector3[]=[];for(let i=0;i<vr.length;i++){const[ln,lt]=vr[i];pts.push(lonLatToVector3(ln,lt,config.globeRadius));} const g=new THREE.BufferGeometry().setFromPoints(pts); const l=new THREE.Line(g,mapMaterial); linesGroup.add(l);});}; if(t==='Polygon')p(c); else if(t==='MultiPolygon')c.forEach(p);});
        globeGroup.add(linesGroup); console.log(`GlobeAnimation: Added map lines.`); }).catch(e => console.error('GlobeAnimation: GeoJSON Error:', e));

    // === Beam / City Data Logic (Conditional) ===
    let citiesData: any[] = [];
    const baseMarkersGroup = new THREE.Group(); globeGroup.add(baseMarkersGroup);
    const beamsGroup = new THREE.Group(); globeGroup.add(beamsGroup);
    let currentBeam: { mesh: THREE.Mesh | null, startTime: number, duration: number, slotDuration: number, lastAnimatedSlot: number } = { mesh: null, startTime: 0, duration: 1600, slotDuration: 400, lastAnimatedSlot: -1 };
    const pulseDuration = 200;

    const baseMarkerGeometry = new THREE.SphereGeometry(0.008, 8, 8);
    const baseMarkerMaterial = new THREE.MeshBasicMaterial({ color: config.baseMarkerColor }); // Use prop
    const beamBaseColor = new THREE.Color(config.beamColor); // Use prop
    const createGradientTexture = () => { const c=document.createElement('canvas');c.width=1;c.height=2;const x=c.getContext('2d')!;const g=x.createLinearGradient(0,c.height,0,0);g.addColorStop(0,`rgba(${Math.round(beamBaseColor.r*255)},${Math.round(beamBaseColor.g*255)},${Math.round(beamBaseColor.b*255)},1.0)`);g.addColorStop(1,`rgba(${Math.round(beamBaseColor.r*255)},${Math.round(beamBaseColor.g*255)},${Math.round(beamBaseColor.b*255)},0.0)`);x.fillStyle=g;x.fillRect(0,0,c.width,c.height);const t=new THREE.CanvasTexture(c);t.needsUpdate=true;return t; };
    const beamGradientTexture = createGradientTexture();
    const beamMaterial = new THREE.MeshBasicMaterial({ map: beamGradientTexture, transparent: true, side: THREE.DoubleSide });
    const beamGeometry = new THREE.ConeGeometry(config.beamRadius, config.beamLength, 8, 1, false); // Use props

    const weightedRandomSelect = (cities: any[]): number => { /* ... same weight logic ... */ let t=0;const v=cities.filter(c=>c['%']!=null&&typeof c['%']==='number'&&c['%']>=0);if(v.length===0)return -1;v.forEach(c=>{t+=c['%'];});if(t<=0){const i=Math.floor(Math.random()*v.length);return cities.findIndex(c=>c===v[i]);}const r=Math.random()*t;let s=0;for(let i=0;i<v.length;i++){s+=v[i]['%'];if(r<=s){return cities.findIndex(c=>c===v[i]);}}return cities.findIndex(c=>c===v[v.length-1]);};

    const createAndStartBeamAnimation = (cityIndex: number) => {
        if (cityIndex < 0 || cityIndex >= baseMarkersGroup.children.length) return;
        const baseMarker = baseMarkersGroup.children[cityIndex]; if (!baseMarker) return;
        const startPoint = baseMarker.position; const direction = startPoint.clone().normalize();

        tweenGroup.current.removeAll(); // Use group ref

        const beamMesh = new THREE.Mesh(beamGeometry, beamMaterial);
        const midPoint = startPoint.clone().add(direction.clone().multiplyScalar(config.beamLength / 2)); beamMesh.position.copy(midPoint);
        const defaultUp = new THREE.Vector3(0, 1, 0); const quaternion = new THREE.Quaternion(); quaternion.setFromUnitVectors(defaultUp, direction); beamMesh.quaternion.copy(quaternion);
        beamMesh.scale.set(0.01, 1, 0.01); beamMesh.visible = true; beamsGroup.add(beamMesh);

        if (currentBeam.mesh) { beamsGroup.remove(currentBeam.mesh); }
        currentBeam.mesh = beamMesh; currentBeam.startTime = performance.now(); currentBeam.lastAnimatedSlot = -1;
    };

    if (config.enableBeamAnimation) {
        console.log("GlobeAnimation: Beam animation enabled, fetching CSV...");
        fetch('/worldcities-validator.csv')
        .then(response => response.ok ? response.text() : Promise.reject(`HTTP ${response.status}`))
        .then((csvText: string) => { // <<<< ADDED : string HERE
            console.log('CSV data fetched successfully. Parsing...');
            Papa.parse(csvText, {
                   complete: (results) => {
                       if (results.errors.length) { console.error('GlobeAnimation: CSV Errors:', results.errors); return; }
                       let rawParsedData = results.data || []; citiesData = rawParsedData; console.log(`GlobeAnimation: CSV parsed: ${citiesData.length} rows.`);
                       let markersAddedCount = 0;
                       citiesData.forEach((city: any, index: number) => {
                           let latNum=city?.lat; let lngNum=city?.lng; let weightNum=city?city['%']:undefined; let isValid=(city && latNum!=null && lngNum!=null && weightNum!=null && typeof latNum==='number' && typeof lngNum==='number' && typeof weightNum==='number' && !isNaN(latNum) && !isNaN(lngNum) && !isNaN(weightNum));
                           if (isValid) { const bm=new THREE.Mesh(baseMarkerGeometry, baseMarkerMaterial); const p=lonLatToVector3(lngNum, latNum, config.globeRadius); bm.position.set(p.x, p.y, p.z); bm.userData={originalIndex: index, lat: latNum, lng: lngNum, '%': weightNum}; baseMarkersGroup.add(bm); markersAddedCount++; } });
                       citiesData = baseMarkersGroup.children.map((marker: any) => ({ lat: marker.userData.lat, lng: marker.userData.lng, '%': marker.userData['%'] })); console.log(`GlobeAnimation: Added ${markersAddedCount} base markers.`);
                       while(beamsGroup.children.length > 0){ beamsGroup.remove(beamsGroup.children[0]); } currentBeam.mesh = null;
                       if (citiesData.length > 0) {
                           console.log('GlobeAnimation: Starting highlighting timer...');
                           const firstIndex = weightedRandomSelect(citiesData); if (firstIndex !== -1) createAndStartBeamAnimation(firstIndex);
                           intervalId.current = setInterval(() => { const index=weightedRandomSelect(citiesData); if (index!==-1)createAndStartBeamAnimation(index); }, currentBeam.duration);
                       } else { console.warn("GlobeAnimation: No valid city data, timer not started."); } },
                   error: (error: any) => { console.error('GlobeAnimation: PapaParse error:', error); } }); })
            .catch(error => { console.error('GlobeAnimation: Error fetching/processing CSV:', error); });
    } else {
        console.log("GlobeAnimation: Beam animation disabled by prop.");
    }

    // === Animation Loop ===
    const animate = (time: number) => {
      animationFrameId.current = requestAnimationFrame(animate);
      globeGroup.rotation.y += config.rotationSpeed; // Use prop

      // Only run beam pulse logic if animation is enabled AND beam exists
      if (config.enableBeamAnimation && currentBeam.mesh) {
         const now=performance.now();const el=now-currentBeam.startTime;
         if(el>=currentBeam.duration){
             beamsGroup.remove(currentBeam.mesh); currentBeam.mesh=null;
         } else {
             const sn=Math.floor(el/currentBeam.slotDuration);
             if(sn>currentBeam.lastAnimatedSlot){
                 currentBeam.lastAnimatedSlot=sn;
                 // Removed the faulty forEach loop here
                 currentBeam.mesh.scale.set(0.01,1,0.01); // Reset scale
                 new Tween(currentBeam.mesh.scale, tweenGroup.current) // Use group ref
                     .to({ x:config.pulsePeakScale, y:1, z:config.pulsePeakScale }, pulseDuration / 2) // Use prop
                     .easing(Easing.Quadratic.Out)
                     .onComplete(()=>{ if(currentBeam.mesh){ new Tween(currentBeam.mesh.scale, tweenGroup.current).to({x:0.01,y:1,z:0.01},pulseDuration/2).easing(Easing.Quadratic.In).start(); }})
                     .start();
             }
         }
      }

      tweenGroup.current.update(time); // Update the specific group ref
      controls.update();
      renderer.render(scene, camera);
    };
    animate(performance.now());

    // === Resize Handler ===
    const handleResize = () => { if (currentMountRef) { const w=currentMountRef.clientWidth; const h=currentMountRef.clientHeight; camera.aspect = w/h; camera.updateProjectionMatrix(); renderer.setSize(w, h); } };
    window.addEventListener('resize', handleResize);

    // === Cleanup Function ===
    return () => { /* ... same comprehensive cleanup ... */ console.log("GlobeAnimation: Cleaning up..."); if(animationFrameId.current)cancelAnimationFrame(animationFrameId.current); window.removeEventListener('resize',handleResize); if(intervalId.current)clearInterval(intervalId.current); tweenGroup.current.removeAll(); scene.traverse(o=>{if(o instanceof THREE.Mesh||o instanceof THREE.Line){if(o.geometry)o.geometry.dispose(); if(o.material){if(Array.isArray(o.material))o.material.forEach(m=>{if(m.map)m.map.dispose(); m.dispose();}); else {if(o.material.map)o.material.map.dispose(); o.material.dispose();}}}}); beamGradientTexture.dispose(); renderer.dispose(); if(currentMountRef){currentMountRef.innerHTML='';} console.log("GlobeAnimation: Cleanup complete."); };

  }, []); // KEEP empty dependency array - run once on mount

  // Render the container div, pass className from props or use default
  return <div ref={mountRef} className={props.className || "w-full h-full min-h-[300px]"} />;
};

export default GlobeAnimation;