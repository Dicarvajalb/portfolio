import { onMount, onCleanup } from "solid-js";
import * as THREE from "three";

export default function ParticleBackground() {
  let containerRef!: HTMLDivElement;

  onMount(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.clientWidth / containerRef.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(containerRef.clientWidth, containerRef.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.appendChild(renderer.domElement);

    // Particle system
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;

      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for soft glowing particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0.4, 0.85, 0.75) }, // teal accent
      },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        varying float vAlpha;

        void main() {
          vec3 pos = position;
          pos.x += sin(uTime * 0.3 + position.y * 0.5) * 0.1;
          pos.y += cos(uTime * 0.2 + position.x * 0.4) * 0.1;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;

          vAlpha = smoothstep(8.0, 2.0, -mvPosition.z) * 0.6;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float strength = 1.0 - (dist * 2.0);
          strength = pow(strength, 3.0);
          gl_FragColor = vec4(uColor, strength * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Floating wireframe geometry
    const icoGeometry = new THREE.IcosahedronGeometry(1.2, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x66d9c2,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    scene.add(icosahedron);

    const torusGeometry = new THREE.TorusGeometry(2, 0.02, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x66d9c2,
      transparent: true,
      opacity: 0.06,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.rotation.x = Math.PI * 0.3;
    scene.add(torus);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      material.uniforms.uTime.value = elapsed;

      // Update particle positions
      const posArray = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3] += velocities[i3];
        posArray[i3 + 1] += velocities[i3 + 1];
        posArray[i3 + 2] += velocities[i3 + 2];

        // Wrap around
        if (Math.abs(posArray[i3]) > 5) velocities[i3] *= -1;
        if (Math.abs(posArray[i3 + 1]) > 5) velocities[i3 + 1] *= -1;
        if (Math.abs(posArray[i3 + 2]) > 4) velocities[i3 + 2] *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Rotate geometries
      icosahedron.rotation.x = elapsed * 0.1 + mouseY * 0.3;
      icosahedron.rotation.y = elapsed * 0.15 + mouseX * 0.3;

      torus.rotation.z = elapsed * 0.05;
      torus.rotation.x = Math.PI * 0.3 + Math.sin(elapsed * 0.2) * 0.1;

      // Smooth camera follow
      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const width = containerRef.clientWidth;
      const height = containerRef.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    onCleanup(() => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      if (containerRef.contains(renderer.domElement)) {
        containerRef.removeChild(renderer.domElement);
      }
    });
  });

  return (
    <div
      ref={containerRef}
      class="fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
