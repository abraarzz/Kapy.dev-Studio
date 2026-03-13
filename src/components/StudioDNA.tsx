import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Text, Line, Box, Sphere } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

const DevEliteCrystals = ({ scrollProgress }: { scrollProgress: any }) => {
  const groupRef = useRef<THREE.Group>(null);
  const crystals = useMemo(() => {
    return Array.from({ length: 5 }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
    }));
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      const progress = scrollProgress.get();
      groupRef.current.children.forEach((child, i) => {
        const targetPos = new THREE.Vector3(0, 0, 0); // Merged state
        const startPos = crystals[i].position; // Separated state
        
        // Lerp between separated and merged based on scroll progress
        child.position.lerpVectors(startPos, targetPos, progress);
        
        // Add some continuous rotation
        child.rotation.x += 0.01;
        child.rotation.y += 0.01;
      });
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {crystals.map((_, i) => (
        <mesh key={i} frustumCulled={false}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshPhysicalMaterial 
            transmission={1}
            thickness={0.5}
            roughness={0.1}
            clearcoat={1}
            color="#ffffff"
            dispersion={1}
            ior={1.5}
          />
          {/* Glowing core */}
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="#00E5FF" />
          </mesh>
        </mesh>
      ))}
    </group>
  );
};

const Chronometer = ({ scrollProgress }: { scrollProgress: any }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gear1Ref = useRef<THREE.Mesh>(null);
  const gear2Ref = useRef<THREE.Mesh>(null);
  const gear3Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.1;
    }
    
    const progress = scrollProgress.get();
    const scrollRotation = progress * Math.PI * 4; // Rotate based on scroll
    
    if (gear1Ref.current) gear1Ref.current.rotation.z = scrollRotation + clock.elapsedTime * 0.5;
    if (gear2Ref.current) gear2Ref.current.rotation.z = -scrollRotation * 1.5 - clock.elapsedTime * 0.7;
    if (gear3Ref.current) gear3Ref.current.rotation.z = scrollRotation * 0.8 + clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} frustumCulled={false}>
        {/* Outer Ring */}
        <mesh>
          <torusGeometry args={[1.5, 0.05, 16, 100]} />
          <meshStandardMaterial color="#FF007F" metalness={0.8} roughness={0.2} wireframe />
        </mesh>
        
        {/* Inner Ring */}
        <mesh>
          <torusGeometry args={[1.2, 0.02, 16, 100]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.5} transparent opacity={0.5} wireframe />
        </mesh>

        {/* Gears */}
        <mesh ref={gear1Ref} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.05, 12]} />
          <meshStandardMaterial color="#FF007F" metalness={0.8} roughness={0.2} wireframe />
        </mesh>
        
        <mesh ref={gear2Ref} position={[0.5, 0.5, -0.1]}>
          <cylinderGeometry args={[0.4, 0.4, 0.05, 8]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} wireframe />
        </mesh>

        <mesh ref={gear3Ref} position={[-0.6, -0.4, 0.1]}>
          <cylinderGeometry args={[0.6, 0.6, 0.05, 10]} />
          <meshStandardMaterial color="#FF007F" metalness={0.8} roughness={0.2} wireframe transparent opacity={0.6} />
        </mesh>

        {/* Center Text */}
        <Text
          position={[0, 0, 0.2]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          MAR 2026
        </Text>
      </group>
    </Float>
  );
};

const MorphingCube = ({ scrollProgress }: { scrollProgress: any }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: '#00FF66', wireframe: true, transparent: true, opacity: 0.5 }), []);
  const solidMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({ 
    color: '#111111', 
    metalness: 0.8, 
    roughness: 0.2,
    clearcoat: 1
  }), []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const progress = scrollProgress.get();
      
      // Rotate
      meshRef.current.rotation.x = clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = clock.elapsedTime * 0.3;

      // Morph shape (Box to Sphere-ish)
      // We can simulate morphing by scaling or changing materials
      // Let's blend materials based on progress
      if (progress < 0.5) {
        meshRef.current.material = wireframeMaterial;
        const scale = 1 + progress;
        meshRef.current.scale.set(scale, scale, scale);
      } else {
        meshRef.current.material = solidMaterial;
        const scale = 2 - (progress - 0.5);
        meshRef.current.scale.set(scale, scale, scale);
      }
    }
  });

  return (
    <mesh ref={meshRef} frustumCulled={false}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
    </mesh>
  );
};

const DynamicLight = ({ scrollProgress }: { scrollProgress: any }) => {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame(() => {
    if (lightRef.current) {
      // Move light from left to right, or top to bottom based on scroll
      const progress = scrollProgress.get();
      lightRef.current.position.x = -5 + (progress * 10);
      lightRef.current.position.y = 5 - (progress * 10);
    }
  });

  return <pointLight ref={lightRef} position={[10, 10, 10]} intensity={2} distance={20} />;
};

const Module = ({ 
  title, 
  subtitle, 
  render3D, 
  glowColor, 
  align = 'left' 
}: { 
  title: string, 
  subtitle: string, 
  render3D: (progress: any) => React.ReactNode, 
  glowColor: string,
  align?: 'left' | 'right'
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const inView = useInView(containerRef, { margin: "-100px" });

  return (
    <div ref={containerRef} className={`relative min-h-[60vh] flex items-center ${align === 'right' ? 'justify-end' : 'justify-start'} mb-32`}>
      {/* Background Glow */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: inView ? 0.15 : 0 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ backgroundColor: glowColor }}></div>
      </motion.div>

      <div className={`relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col ${align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
        {/* Text Content */}
        <div className="flex-1 space-y-4">
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-white font-subheading">{title}</h3>
          <p className="font-mono text-white/60 leading-relaxed max-w-md">{subtitle}</p>
        </div>

        {/* 3D Canvas */}
        <div className="flex-1 h-[400px] w-full relative">
          <Canvas frameloop={inView ? "always" : "never"} camera={{ position: [0, 0, 5], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <DynamicLight scrollProgress={scrollYProgress} />
              {render3D(scrollYProgress)}
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export const StudioDNA = () => {
  return (
    <section className="relative z-10 py-32 bg-[#050505] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-[150px] text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-heading">Studio DNA</h2>
        <p className="font-mono text-white/70">THE ARCHITECTURE OF OUR COLLECTIVE.</p>
      </div>

      <Module 
        title="The Engineering Elite" 
        subtitle="A global collective of senior architects pushing the limits of WebGL and Cloud compute."
        glowColor="#00E5FF" // Cyan glow
        render3D={(progress: any) => <DevEliteCrystals scrollProgress={progress} />}
      />

      <Module 
        title="Established March 2026" 
        subtitle="Born from the need for technical sovereignty and aesthetic perfection."
        glowColor="#FF007F" // Hot Pink glow
        align="right"
        render3D={(progress: any) => <Chronometer scrollProgress={progress} />}
      />

      <Module 
        title="Bespoke Digital Ecosystems" 
        subtitle="We don't build sites; we architect digital legacies."
        glowColor="#00FF66" // Neon Green glow
        render3D={(progress: any) => <MorphingCube scrollProgress={progress} />}
      />
    </section>
  );
};
