import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Icosahedron, Html, Environment, ContactShadows, Text, Edges } from '@react-three/drei';
import { useRef, useState, Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { useInView } from 'motion/react';

const WebDevScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} frustumCulled={false}>
        {/* Browser Window / Glass Backplate */}
        <RoundedBox args={[3.2, 2.2, 0.1]} radius={0.1} position={[0, 0, -0.2]}>
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={0.9} 
            opacity={1} 
            transparent 
            roughness={0.2} 
            ior={1.5} 
            thickness={0.5} 
          />
        </RoundedBox>
        
        {/* Browser Top Bar */}
        <mesh position={[0, 0.95, -0.1]}>
          <planeGeometry args={[3, 0.2]} />
          <meshBasicMaterial color="#333333" transparent opacity={0.5} />
        </mesh>
        {/* Browser Dots */}
        <mesh position={[-1.3, 0.95, -0.09]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color="#FF5F56" />
        </mesh>
        <mesh position={[-1.15, 0.95, -0.09]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color="#FFBD2E" />
        </mesh>
        <mesh position={[-1.0, 0.95, -0.09]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color="#27C93F" />
        </mesh>

        {/* Hero Section */}
        <RoundedBox args={[2.8, 0.7, 0.05]} radius={0.05} position={[0, 0.35, 0.1]}>
          <meshBasicMaterial color="#00FF66" wireframe transparent opacity={0.8} />
        </RoundedBox>

        {/* Content Blocks */}
        <RoundedBox args={[1.2, 0.7, 0.05]} radius={0.05} position={[-0.75, -0.45, 0.2]}>
          <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.6} />
        </RoundedBox>
        <RoundedBox args={[1.2, 0.7, 0.05]} radius={0.05} position={[0.75, -0.45, 0.3]}>
          <meshBasicMaterial color="#FF007F" wireframe transparent opacity={0.6} />
        </RoundedBox>

        {/* Floating Code Elements */}
        <Text position={[-2.0, 0.5, 0.5]} fontSize={0.2} color="#00E5FF" rotation={[0, 0.2, 0]}>
          {"<div />"}
        </Text>
        <Text position={[2.0, -0.5, 0.8]} fontSize={0.2} color="#FF007F" rotation={[0, -0.2, 0]}>
          {"{...}"}
        </Text>
        <Text position={[0, -1.3, 0.4]} fontSize={0.15} color="#00FF66">
          {"display: grid;"}
        </Text>
      </group>
    </Float>
  );
};

const MobileEcosystemScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      orbitRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      orbitRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} frustumCulled={false}>
        {/* Phone Chassis */}
        <RoundedBox args={[1.6, 3.2, 0.15]} radius={0.15} position={[0, 0, 0]}>
          <meshPhysicalMaterial 
            color="#111111" 
            metalness={0.9} 
            roughness={0.1} 
            clearcoat={1}
          />
        </RoundedBox>
        
        {/* Phone Screen Base */}
        <RoundedBox args={[1.4, 3.0, 0.05]} radius={0.1} position={[0, 0, 0.1]}>
          <meshBasicMaterial color="#FF007F" wireframe transparent opacity={0.2} />
        </RoundedBox>

        {/* Floating UI Card 1 (Hero Image/Video) */}
        <RoundedBox args={[1.2, 1.0, 0.05]} radius={0.05} position={[0, 0.8, 0.4]}>
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.8} wireframe />
        </RoundedBox>
        <Text position={[0, 0.8, 0.45]} fontSize={0.15} color="#00E5FF">
          {"<HeroWidget />"}
        </Text>

        {/* Floating UI Card 2 (List Item) */}
        <RoundedBox args={[1.2, 0.3, 0.05]} radius={0.05} position={[0, 0.0, 0.6]}>
          <meshBasicMaterial color="#00FF66" transparent opacity={0.6} wireframe />
        </RoundedBox>
        <Text position={[0, 0.0, 0.65]} fontSize={0.1} color="#00FF66">
          {"Data Stream Active"}
        </Text>

        {/* Floating UI Card 3 (List Item) */}
        <RoundedBox args={[1.2, 0.3, 0.05]} radius={0.05} position={[0, -0.4, 0.5]}>
          <meshBasicMaterial color="#FF007F" transparent opacity={0.6} wireframe />
        </RoundedBox>
        <Text position={[0, -0.4, 0.55]} fontSize={0.1} color="#FF007F">
          {"Syncing..."}
        </Text>

        {/* Floating Action Button */}
        <mesh position={[0.4, -1.0, 0.7]}>
          <circleGeometry args={[0.2, 32]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.8} wireframe />
        </mesh>
        <Text position={[0.4, -1.0, 0.75]} fontSize={0.2} color="#00E5FF">
          {"+"}
        </Text>

        {/* Orbiting App Nodes */}
        <group ref={orbitRef}>
          <mesh position={[1.5, 0, 0]}>
            <icosahedronGeometry args={[0.15, 0]} />
            <meshBasicMaterial color="#00FF66" wireframe />
          </mesh>
          <mesh position={[-1.5, 1, 0]}>
            <octahedronGeometry args={[0.15, 0]} />
            <meshBasicMaterial color="#00E5FF" wireframe />
          </mesh>
          <mesh position={[0, -1.8, 0.5]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshBasicMaterial color="#FF007F" wireframe />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

const RadarPulse = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime % 3; // 3 second loop
      const scale = t * 1.5;
      const opacity = Math.max(0, 1 - t / 2);
      ref.current.scale.set(scale, scale, scale);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0} wireframe />
    </mesh>
  );
};

const OSINTGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    const targetScale = hovered ? 1.1 : 1;
    const speedMult = hovered ? 3 : 1;

    if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      groupRef.current.rotation.y += 0.002 * speedMult;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z -= 0.005 * speedMult;
    if (ring2Ref.current) ring2Ref.current.rotation.z += 0.008 * speedMult;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} frustumCulled={false}>
        <RadarPulse />
        {/* Core Globe */}
        <Icosahedron args={[1.2, 2]}>
          <meshPhysicalMaterial 
            wireframe 
            color="#ffffff" 
            emissive="#ffffff" 
            emissiveIntensity={0.2} 
            transparent 
            opacity={0.3} 
          />
        </Icosahedron>
        <Icosahedron args={[1.15, 2]}>
          <meshPhysicalMaterial 
            color="#111111" 
            transparent 
            opacity={0.9}
            roughness={0.1}
            metalness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Icosahedron>
        
        {/* Orbital Rings */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[1.8, 0.005, 16, 100]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
          <Html position={[1.8, 0, 0]} transform center>
            <div className="font-mono text-[8px] text-white whitespace-nowrap opacity-80 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
              192.168.1.1 :: DATA_FRAG_0x9A :: ENCRYPTED
            </div>
          </Html>
          <Html position={[-1.8, 0, 0]} transform center>
            <div className="font-mono text-[8px] text-white whitespace-nowrap opacity-80 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
              PACKET_SNIFF :: ACTIVE :: PORT_8080
            </div>
          </Html>
        </mesh>
        
        <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.2, 0.005, 16, 100]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
          <Html position={[0, 2.2, 0]} transform center>
            <div className="font-mono text-[8px] text-white whitespace-nowrap opacity-80 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
              SYS.AUTH.BYPASS :: TRACE_ROUTE_ACTIVE
            </div>
          </Html>
          <Html position={[0, -2.2, 0]} transform center>
            <div className="font-mono text-[8px] text-white whitespace-nowrap opacity-80 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
              NODE_CONNECT :: SECURE_TUNNEL_ESTABLISHED
            </div>
          </Html>
        </mesh>
      </group>
    </Float>
  );
};

export const ProductGallery = () => {
  const webRef = useRef(null);
  const appRef = useRef(null);
  const osintRef = useRef(null);
  const webInView = useInView(webRef);
  const appInView = useInView(appRef);
  const osintInView = useInView(osintRef);

  return (
    <section className="relative z-10 px-6 py-48 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-heading">Our Offerings</h2>
          <p className="font-mono text-white/70">BUILDING THE NEXT GENERATION OF DIGITAL INFRASTRUCTURE.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Custom Web Development */}
          <div ref={webRef} className="col-span-1 md:col-span-2 relative h-[400px] glass-card rounded-2xl overflow-hidden group hover-3d-trigger" style={{ boxShadow: "-2px 0 0 rgba(0,255,102,0.2), 2px 0 0 rgba(0,229,255,0.2), 0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.05)" }}>
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 bg-[#00FF66] rounded-full blur-[100px] opacity-15"></div>
            </div>
            <div className="absolute inset-0 z-0">
              <Canvas frameloop={webInView ? "always" : "never"} camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                  <WebDevScene />
                  <Environment preset="city" />
                  <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
                </Suspense>
              </Canvas>
            </div>
            <div className="absolute bottom-0 left-0 p-8 z-10 pointer-events-none">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 font-subheading">Custom Web Development</h3>
              <p className="font-mono text-white/50 text-sm">Websites that don't just exist. They perform.</p>
            </div>
          </div>

          {/* Mobile App Ecosystems */}
          <div ref={appRef} className="relative h-[400px] glass-card rounded-2xl overflow-hidden group hover-3d-trigger" style={{ boxShadow: "-2px 0 0 rgba(255,0,127,0.2), 2px 0 0 rgba(0,229,255,0.2), 0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.05)" }}>
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 bg-[#FF007F] rounded-full blur-[100px] opacity-15"></div>
            </div>
            <div className="absolute inset-0 z-0">
              <Canvas frameloop={appInView ? "always" : "never"} camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 5, 5]} intensity={1} />
                  <MobileEcosystemScene />
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
            </div>
            <div className="absolute bottom-0 left-0 p-8 z-10 pointer-events-none">
              <h3 className="text-2xl font-bold mb-2 font-subheading">Mobile App Ecosystems</h3>
              <p className="font-mono text-white/50 text-sm">Native performance. Fluid interactions.</p>
            </div>
          </div>

          {/* OSINT Intelligence */}
          <div ref={osintRef} className="relative h-[400px] glass-card rounded-2xl overflow-hidden group hover-3d-trigger" style={{ boxShadow: "-2px 0 0 rgba(0,229,255,0.2), 2px 0 0 rgba(255,255,255,0.2), 0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.05)" }}>
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 bg-[#00E5FF] rounded-full blur-[100px] opacity-10"></div>
            </div>
            <div className="absolute inset-0 z-0">
              <Canvas frameloop={osintInView ? "always" : "never"} camera={{ position: [0, 0, 6], fov: 45 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.2} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <spotLight position={[-5, 5, -5]} intensity={5} color="#ffffff" />
                  <OSINTGlobe />
                </Suspense>
              </Canvas>
            </div>
            <div className="absolute bottom-0 left-0 p-8 z-10 pointer-events-none">
              <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] font-subheading">OSINT & Digital Intelligence</h3>
              <p className="font-mono text-white/70 text-sm">Deep-web reconnaissance and data-driven security audits.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
