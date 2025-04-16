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
  mapLineColor?: number | string; baseMarkerColor?: number | string; beamColor?: number | string;
  globeRadius?: number; beamLength?: number; beamRadius?: number; rotationSpeed?: number;
  initialCameraZ?: number; pulsePeakScale?: number; minDistance?: number; maxDistance?: number;
  disableZoom?: boolean; disablePan?: boolean; enableBeamAnimation?: boolean; className?: string;
}

// --- Default Prop Values ---
const defaultProps: Required<Omit<GlobeAnimationProps, 'className'>> = {
    mapLineColor: 0xDEF0F7, baseMarkerColor: 0x28B6E2, beamColor: 0x28B6E2, globeRadius: 1.0,
    beamLength: 0.4, beamRadius: 0.015, rotationSpeed: 0.0005, initialCameraZ: 2.0,
    pulsePeakScale: 2.0, minDistance: 0.4, maxDistance: 10, disableZoom: true, disablePan: true,
    enableBeamAnimation: true,
};

const GlobeAnimation: React.FC<GlobeAnimationProps> = (props) => {
  const config = { ...defaultProps, ...props };
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();
  const intervalId = useRef<NodeJS.Timeout>();
  const tweenGroup = useRef(new Group());

  useEffect(() => {
    if (!mountRef.current || mountRef.current.childElementCount > 0) return;
    const currentMountRef = mountRef.current;
    console.log("GlobeAnimation: Initializing with config:", config); // Keep this log

    // === Basic Setup (Scene, GlobeGroup, Camera, Renderer, Controls, Lighting) ===
    const scene = new THREE.Scene();
    const globeGroup = new THREE.Group(); scene.add(globeGroup);
    const camera = new THREE.PerspectiveCamera(75, currentMountRef.clientWidth / currentMountRef.clientHeight, 0.1, 1000); camera.position.z = config.initialCameraZ;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); renderer.setSize(currentMountRef.clientWidth, currentMountRef.clientHeight); currentMountRef.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement); controls.enableDamping = true; controls.dampingFactor = 0.05; controls.minDistance = config.minDistance; controls.maxDistance = config.maxDistance; controls.target.set(0, 0, 0); controls.enablePan = !config.disablePan; controls.enableZoom = !config.disableZoom;
    const ambientLight = new THREE.AmbientLight(0x808080); scene.add(ambientLight); const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); directionalLight.position.set(5, 5, 5); scene.add(directionalLight); const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5); directionalLight2.position.set(-5, -5, -5); scene.add(directionalLight2);

    // --- CORRECTED Function lonLatToVector3 ---
    const lonLatToVector3 = (lon: number, lat: number, radius: number): THREE.Vector3 => { const x=radius*Math.cos(lat*Math.PI/180)*Math.cos(lon*Math.PI/180); const y=radius*Math.sin(lat*Math.PI/180); const z=-(radius*Math.cos(lat*Math.PI/180)*Math.sin(lon*Math.PI/180)); return new THREE.Vector3(x,y,z); };

    // --- GeoJSON Map Outline Code ---
    const mapMaterial = new THREE.LineBasicMaterial({ color: config.mapLineColor });
    fetch('/ne_110m_land.geojson').then(r => r.ok ? r.json() : Promise.reject(`HTTP ${r.status}`)).then(geojsonData => {
        const linesGroup = new THREE.Group(); /* ... process geojson ... */
        geojsonData.features.forEach((f:any)=>{if(!f.geometry)return; const c=f.geometry.coordinates; const t=f.geometry.type; const p=(poly:any[][])=>{poly.forEach(r=>{const vr=r.filter((c:any[])=>Array.isArray(c)&&c.length===2&&typeof c[0]==='number'&&typeof c[1]==='number'); if(vr.length<2)return; const pts:THREE.Vector3[]=[];for(let i=0;i<vr.length;i++){const[ln,lt]=vr[i];pts.push(lonLatToVector3(ln,lt,config.globeRadius));} const g=new THREE.BufferGeometry().setFromPoints(pts); const l=new THREE.Line(g,mapMaterial); linesGroup.add(l);});}; if(t==='Polygon')p(c); else if(t==='MultiPolygon')c.forEach(p);});
        globeGroup.add(linesGroup); console.log(`GlobeAnimation: Added map lines.`); }).catch(e => console.error('GlobeAnimation: GeoJSON Error:', e));

    // --- Start of Phase 3 Code ---
    let citiesData: any[] = [];
    const baseMarkersGroup = new THREE.Group(); globeGroup.add(baseMarkersGroup);
    const beamsGroup = new THREE.Group(); globeGroup.add(beamsGroup);
    let currentBeam: { mesh: THREE.Mesh | null, startTime: number, duration: number, slotDuration: number, lastAnimatedSlot: number } = { mesh: null, startTime: 0, duration: 1600, slotDuration: 400, lastAnimatedSlot: -1 };
    const pulseDuration = 200; const pulsePeakScale = config.pulsePeakScale;

    const baseMarkerGeometry = new THREE.SphereGeometry(0.008, 8, 8);
    const baseMarkerMaterial = new THREE.MeshBasicMaterial({ color: config.baseMarkerColor });
    const beamBaseColor = new THREE.Color(config.beamColor);
    const createGradientTexture = () => { /* ... same gradient texture fn ... */ const c=document.createElement('canvas');c.width=1;c.height=2;const x=c.getContext('2d')!;const g=x.createLinearGradient(0,c.height,0,0);g.addColorStop(0,`rgba(${Math.round(beamBaseColor.r*255)},${Math.round(beamBaseColor.g*255)},${Math.round(beamBaseColor.b*255)},1.0)`);g.addColorStop(1,`rgba(${Math.round(beamBaseColor.r*255)},${Math.round(beamBaseColor.g*255)},${Math.round(beamBaseColor.b*255)},0.0)`);x.fillStyle=g;x.fillRect(0,0,c.width,c.height);const t=new THREE.CanvasTexture(c);t.needsUpdate=true;return t; };
    const beamGradientTexture = createGradientTexture();
    const beamMaterial = new THREE.MeshBasicMaterial({ map: beamGradientTexture, transparent: true, side: THREE.DoubleSide });
    const beamGeometry = new THREE.ConeGeometry(config.beamRadius, config.beamLength, 8, 1, false);

    const weightedRandomSelect = (cities: any[]): number => { /* ... same weight logic ... */ let t=0;const v=cities.filter(c=>c['%']!=null&&typeof c['%']==='number'&&c['%']>=0);if(v.length===0)return -1;v.forEach(c=>{t+=c['%'];});if(t<=0){const i=Math.floor(Math.random()*v.length);return cities.findIndex(c=>c===v[i]);}const r=Math.random()*t;let s=0;for(let i=0;i<v.length;i++){s+=v[i]['%'];if(r<=s){return cities.findIndex(c=>c===v[i]);}}return cities.findIndex(c=>c===v[v.length-1]);};
    const createAndStartBeamAnimation = (cityIndex: number) => { /* ... same logic ... */ if(cityIndex<0||cityIndex>=baseMarkersGroup.children.length)return; const bm=baseMarkersGroup.children[cityIndex]; if(!bm)return; const sp=bm.position; const d=sp.clone().normalize(); tweenGroup.current.removeAll(); const b=new THREE.Mesh(beamGeometry,beamMaterial); const mp=sp.clone().add(d.clone().multiplyScalar(config.beamLength/2));b.position.copy(mp); const du=new THREE.Vector3(0,1,0); const q=new THREE.Quaternion();q.setFromUnitVectors(du,d);b.quaternion.copy(q); b.scale.set(0.01,1,0.01); b.visible=true; beamsGroup.add(b); if(currentBeam.mesh){beamsGroup.remove(currentBeam.mesh);} currentBeam.mesh=b; currentBeam.startTime=performance.now(); currentBeam.lastAnimatedSlot=-1; };

    // --- Conditionally Fetch CSV and Start Beam Animation ---
    if (config.enableBeamAnimation) {
        console.log("GlobeAnimation: Beam animation enabled, fetching CSV...");
        fetch('/worldcities-validator.csv')
            .then(response => response.ok ? response.text() : Promise.reject(`HTTP ${response.status}`))
            .then(csvText => {
               console.log('CSV data fetched successfully. Parsing...'); // Log fetch success
               Papa.parse(csvText, {
                   header: true, skipEmptyLines: true, dynamicTyping: false, // <<<< Turn OFF dynamicTyping, parse manually
                   // Use the complete callback with detailed debugging logs & ROBUST PARSING
                   complete: (results) => {
                       // Log raw PapaParse results
                       console.log("DEBUG: PapaParse results:", results);

                       if (results.errors.length) {
                           console.error('Errors parsing CSV:', results.errors);
                       }

                       // Log the data PapaParse actually produced BEFORE we process it
                       let rawParsedData = results.data || [];
                       console.log(`DEBUG: PapaParse produced results.data with ${rawParsedData.length} rows.`);
                       if (rawParsedData.length > 0) {
                            console.log("DEBUG: First row of raw parsed data:", rawParsedData[0]);
                       }

                       // --- Create and Position BASE Markers (with Robust Parsing from Response #65) ---
                       console.log('DEBUG: Creating base markers with robust parsing...');
                       let markersAddedCount = 0;
                       rawParsedData.forEach((city: any, index: number) => {
                           let latStr = city?.lat; // Get as string/original
                           let lngStr = city?.lng;
                           let weightStr = city ? city['%'] : undefined;

                           let latNum: number | null = null;
                           let lngNum: number | null = null;
                           let weightNum: number | null = null;
                           let isValid = false;

                           try {
                               // Attempt to parse Lat/Lng as floats
                               if (latStr != null && String(latStr).trim() !== '') latNum = parseFloat(String(latStr));
                               if (lngStr != null && String(lngStr).trim() !== '') lngNum = parseFloat(String(lngStr));

                               // Attempt to parse Weight, removing '%' sign if present
                               if (weightStr != null && String(weightStr).trim() !== '') {
                                   weightNum = parseFloat(String(weightStr).replace('%', ''));
                               }

                               // Validate ALL fields after attempted parsing
                               isValid = (latNum != null && lngNum != null && weightNum != null &&
                                          !isNaN(latNum) && !isNaN(lngNum) && !isNaN(weightNum));

                           } catch (e) {
                               console.warn(`DEBUG: Error processing data for CSV row index ${index}:`, city, e);
                               isValid = false;
                           }

                            if (isValid) {
                               const finalLng = lngNum!; const finalLat = latNum!; const finalWeight = weightNum!;
                               const baseMarker = new THREE.Mesh(baseMarkerGeometry, baseMarkerMaterial);
                               const position = lonLatToVector3(finalLng, finalLat, config.globeRadius);
                               baseMarker.position.set(position.x, position.y, position.z);
                               baseMarker.userData = { originalIndex: index, lat: finalLat, lng: finalLng, '%': finalWeight };
                               baseMarkersGroup.add(baseMarker);
                               markersAddedCount++;
                           } else {
                               console.warn(`DEBUG: Skipping CSV row index ${index} due to invalid/missing data. Original:`, city, `Parsed: { lat: ${latNum}, lng: ${lngNum}, weight: ${weightNum} }`);
                           }
                       });
                       console.log(`DEBUG: Added ${markersAddedCount} base markers to the scene.`);
                       console.log(`DEBUG: baseMarkersGroup now contains ${baseMarkersGroup.children.length} children.`);

                       // Align citiesData array AFTER markers are added
                       citiesData = baseMarkersGroup.children.map((marker: any) => ({ lat: marker.userData.lat, lng: marker.userData.lng, '%': marker.userData['%'] }));
                       console.log(`DEBUG: Aligned citiesData array. Length: ${citiesData.length}`);

                       // Remove any potential previous beams
                        while(beamsGroup.children.length > 0){ beamsGroup.remove(beamsGroup.children[0]); } currentBeam.mesh = null;

                       // --- Start the Random Selection Timer ---
                       if (citiesData.length > 0) { // Check if data is valid to start timer
                           console.log(`Starting highlighting timer (citiesData length: ${citiesData.length})...`);
                           const firstIndex = weightedRandomSelect(citiesData); if (firstIndex !== -1) createAndStartBeamAnimation(firstIndex);
                           intervalId.current = setInterval(() => {
                               const index = weightedRandomSelect(citiesData); if (index !== -1) createAndStartBeamAnimation(index);
                           }, currentBeam.duration);
                       } else {
                           console.warn("No valid city data loaded. Timer not started. Check CSV and parsing logs."); // Keep warning
                       }
                   }, // End of complete callback
                   error: (error: any) => { console.error('PapaParse error callback triggered:', error); } // Log papa parse specific errors
               });
            })
            .catch(error => { console.error("!!!! ERROR IN CSV FETCH OR .then() BLOCK !!!!", error); });
    } else {
        console.log("GlobeAnimation: Beam animation disabled by prop.");
    }

    // === Animation Loop ===
    const animate = (time: number) => { /* ... same animate loop as response #61 ... */
        animationFrameId.current = requestAnimationFrame(animate); const now=performance.now();
        globeGroup.rotation.y += config.rotationSpeed;
        if(config.enableBeamAnimation && currentBeam.mesh){ const el=now-currentBeam.startTime; if(el>=currentBeam.duration){beamsGroup.remove(currentBeam.mesh); currentBeam.mesh=null;}else{const sn=Math.floor(el/currentBeam.slotDuration); if(sn>currentBeam.lastAnimatedSlot){currentBeam.lastAnimatedSlot=sn; /* Removed faulty forEach loop */ currentBeam.mesh.scale.set(0.01,1,0.01); new Tween(currentBeam.mesh.scale,tweenGroup.current).to({x:config.pulsePeakScale,y:1,z:config.pulsePeakScale},pulseDuration/2).easing(Easing.Quadratic.Out).onComplete(()=>{if(currentBeam.mesh){new Tween(currentBeam.mesh.scale,tweenGroup.current).to({x:0.01,y:1,z:0.01},pulseDuration/2).easing(Easing.Quadratic.In).start();}}).start();}}}
        tweenGroup.current.update(time); controls.update(); renderer.render(scene, camera);
    };
    animate(performance.now());

    // === Resize Handler ===
    const handleResize = () => { if (currentMountRef) { const w=currentMountRef.clientWidth; const h=currentMountRef.clientHeight; camera.aspect = w/h; camera.updateProjectionMatrix(); renderer.setSize(w, h); } };
    window.addEventListener('resize', handleResize);

    // === Cleanup Function ===
    return () => { console.log("GlobeAnimation: Cleaning up..."); /* ... same comprehensive cleanup ... */ if(animationFrameId.current)cancelAnimationFrame(animationFrameId.current); window.removeEventListener('resize',handleResize); if(intervalId.current)clearInterval(intervalId.current); tweenGroup.current.removeAll(); scene.traverse(o=>{if(o instanceof THREE.Mesh||o instanceof THREE.Line){if(o.geometry)o.geometry.dispose(); if(o.material){if(Array.isArray(o.material))o.material.forEach(m=>{if(m.map)m.map.dispose();m.dispose();}); else {if(o.material.map)o.material.map.dispose(); o.material.dispose();}}}}); beamGradientTexture.dispose(); renderer.dispose(); if(currentMountRef){currentMountRef.innerHTML='';} console.log("GlobeAnimation: Cleanup complete."); };

  }, []); // Keep empty dependency array

  // Render the container div
  return <div ref={mountRef} className={props.className || "w-full h-full min-h-[300px]"} />;
};

export default GlobeAnimation;