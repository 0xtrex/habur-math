"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function CricketParticleBall() {

const mountRef = useRef<HTMLDivElement>(null)

useEffect(() => {

let renderer: THREE.WebGLRenderer
let animationId: number

const container = mountRef.current
if (!container) return

/* ---------- PREVENT DUPLICATE CANVAS ---------- */

while (container.firstChild) {
container.removeChild(container.firstChild)
}

/* ---------- SCENE ---------- */

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth / window.innerHeight,
1,
1000
)

camera.position.z = 90

renderer = new THREE.WebGLRenderer({
alpha: true,
antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)

container.appendChild(renderer.domElement)

/* ---------- BALL ---------- */

const ball = new THREE.Group()
scene.add(ball)

/* PARTICLE BALL */

const count = 8000
const geo = new THREE.BufferGeometry()
const pos = new Float32Array(count * 3)

for (let i = 0; i < count; i++) {

const r = 14
const theta = Math.random() * Math.PI * 2
const phi = Math.acos((Math.random() * 2) - 1)

pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
pos[i * 3 + 2] = r * Math.cos(phi)

}

geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))

const mat = new THREE.PointsMaterial({
color: 0xff3333,
size: 1
})

ball.add(new THREE.Points(geo, mat))

/* SEAM */

const seamGeo = new THREE.TorusGeometry(14.4, 0.4, 16, 200)
const seamMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
const seam = new THREE.Mesh(seamGeo, seamMat)

seam.rotation.x = Math.PI / 2
ball.add(seam)

/* ---------- DUST ---------- */

const dustGroup = new THREE.Group()
scene.add(dustGroup)

function createDust(x: number, y: number) {

for (let i = 0; i < 80; i++) {

const geo = new THREE.SphereGeometry(0.35, 6, 6)

const mat = new THREE.MeshBasicMaterial({
color: 0xffffff,
transparent: true,
opacity: 0.9
})

const p = new THREE.Mesh(geo, mat)

p.position.set(x, y, 0)

p.userData = {
vx: (Math.random() - 0.5) * 2.5,
vy: Math.random() * 2,
life: 80
}

dustGroup.add(p)

}

}

/* ---------- PHYSICS ---------- */

let x = 0
let y = 10

let vx = (Math.random() - 0.5) * 1.8
let vy = 2.2

const gravity = -0.06
const floor = -28
const wall = 45

/* ---------- ANIMATION ---------- */

function animate() {

animationId = requestAnimationFrame(animate)

vy += gravity

x += vx
y += vy

if (y < floor) {

y = floor

vy *= -0.96

if (Math.abs(vy) < 1.5) vy = 2.2

createDust(x, y)

}

if (x > wall || x < -wall) {

vx *= -1

}

ball.position.x = x
ball.position.y = y

ball.rotation.y += 0.05
ball.rotation.x += 0.04

for (let i = dustGroup.children.length - 1; i >= 0; i--) {

const p: any = dustGroup.children[i]

p.position.x += p.userData.vx
p.position.y += p.userData.vy

p.userData.vy -= 0.05
p.userData.life--

p.material.opacity = p.userData.life / 80

if (p.userData.life <= 0) dustGroup.remove(p)

}

renderer.render(scene, camera)

}

animate()

/* ---------- RESIZE FIX ---------- */

function onResize() {

camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth, window.innerHeight)

}

window.addEventListener("resize", onResize)

/* ---------- CLEANUP ---------- */

return () => {

cancelAnimationFrame(animationId)

window.removeEventListener("resize", onResize)

renderer.dispose()

while (container.firstChild) {
container.removeChild(container.firstChild)
}

}

}, [])

return (
<div ref={mountRef} className="absolute inset-0 -z-10" />
)

}
