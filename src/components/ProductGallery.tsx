import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Icosahedron, Html, Environment, ContactShadows } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

const GlassPane = () => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshPhysicalMaterial 
          transmission={1}
          thickness={0.5}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color="#ffffff"
        />
      </mesh>
      <Html transform position={[0, 0, 0.1]}>
        <div className="font-mono text-[10px] text-white/80 bg-black/40 p-4 rounded border border-white/20 backdrop-blur-md whitespace-pre shadow-2xl">
          <span className="text-pink-400">const</span> <span className="text-blue-400">build</span> = <span className="text-yellow-300">()</span> <span className="text-pink-400">=&gt;</span> {'{\n'}
          {'  '}return <span className="text-green-400">"Perfection"</span>;{'\n'}
          {'}'};
        </div>
      </Html>
    </Float>
  );
};

const Smartphone = () => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      ref.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref}>
        <RoundedBox args={[1.5, 3, 0.2]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[1.3, 2.8]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
        {/* Screen Content */}
        <Html transform position={[0, 0, 0.12]}>
          <div className="w-[110px] h-[240px] flex flex-col items-center justify-center border border-white/10 rounded-sm bg-gradient-to-b from-zinc-900 to-black">
            <div className="w-8 h-8 rounded-full border border-white/20 mb-2"></div>
            <div className="w-16 h-2 bg-white/20 rounded-full mb-1"></div>
            <div className="w-12 h-2 bg-white/10 rounded-full"></div>
          </div>
        </Html>
      </group>
    </Float>
  );
};

const OSINTGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z -= 0.005;
    if (ring2Ref.current) ring2Ref.current.rotation.z += 0.008;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Core Globe */}
        <Icosahedron args={[1.2, 2]}>
          <meshStandardMaterial wireframe color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} transparent opacity={0.2} />
        </Icosahedron>
        <Icosahedron args={[1.15, 2]}>
          <meshStandardMaterial color="#000000" transparent opacity={0.8} />
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
  return (
    <section className="relative z-10 px-6 py-32 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Our Offerings</h2>
          <p className="font-mono text-white/50">BUILDING THE NEXT GENERATION OF DIGITAL INFRASTRUCTURE.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Custom Web Development */}
          <div className="col-span-1 md:col-span-2 relative h-[400px] border border-white/10 bg-white/[0.02] rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <GlassPane />
                <Environment preset="city" />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
              </Canvas>
            </div>
            <div className="absolute bottom-0 left-0 p-8 z-10 pointer-events-none">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Custom Web Development</h3>
              <p className="font-mono text-white/50 text-sm">Websites that don't just exist. They perform.</p>
            </div>
          </div>

          {/* Mobile App Ecosystems */}
          <div className="relative h-[400px] border border-white/10 bg-white/[0.02] rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Smartphone />
                <Environment preset="city" />
              </Canvas>
            </div>
            <div className="absolute bottom-0 left-0 p-8 z-10 pointer-events-none">
              <h3 className="text-2xl font-bold mb-2">Mobile App Ecosystems</h3>
              <p className="font-mono text-white/50 text-sm">Native performance. Fluid interactions.</p>
            </div>
          </div>

          {/* OSINT Intelligence */}
          <div className="relative h-[400px] border border-white/10 bg-white/[0.02] rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <OSINTGlobe />
              </Canvas>
            </div>
            <div className="absolute bottom-0 left-0 p-8 z-10 pointer-events-none">
              <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">OSINT & Digital Intelligence</h3>
              <p className="font-mono text-white/70 text-sm">Deep-web reconnaissance and data-driven security audits.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
