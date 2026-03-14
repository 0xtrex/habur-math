"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export default function ParticleCricketScene() {

const mountRef = useRef<HTMLDivElement>(null)

useEffect(() => {

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth / 500,
0.1,
1000
)

camera.position.z = 200

const renderer = new THREE.WebGLRenderer({
alpha: true,
antialias: true
})

renderer.setSize(window.innerWidth, 500)

mountRef.current?.appendChild(renderer.domElement)

const loader = new GLTFLoader()

loader.load("/models/batsman.glb", (gltf) => {

const model = gltf.scene

let geometry: THREE.BufferGeometry | null = null

model.traverse((child: any) => {
if (child.isMesh) {
geometry = child.geometry
}
})

if (!geometry) return

const pointsMaterial = new THREE.PointsMaterial({
color: 0xffffff,
size: 1.2
})

const particles = new THREE.Points(geometry, pointsMaterial)

scene.add(particles)

function animate() {

requestAnimationFrame(animate)

particles.rotation.y += 0.002

renderer.render(scene, camera)

}

animate()

})

}, [])

return <div ref={mountRef} />

}
