

const canvas= document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

			const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer( { canvas});
			renderer.setSize( window.innerWidth, window.innerHeight );
		

			const geometry = new THREE.TorusGeometry( 1, 3, 16, 100 );

            const particlesgeometry = new THREE.BufferGeometry();
            const particlesCnt=50000;

            //float32array
            const posArray= new Float32Array(particlesCnt * 3);

            for(  let i= 0; i < particlesCnt * 3; i++) {
                posArray[i]= ((Math.random() - 0.5) * 50) 
            }

            particlesgeometry.setAttribute( 'position' , new THREE.BufferAttribute(posArray, 3));
              

			const material = new THREE.PointsMaterial( { size: 0.05, sizeAttenuation:true  } );
			const sphere= new THREE.Points( geometry, material );
            const particlesMesh= new THREE.Points( particlesgeometry,material);
			scene.add( sphere, particlesMesh );

			const pointlight= new THREE.PointLight(0xffffff, 0.1);
			pointlight.position.x=2;
			pointlight.position.y=3;
			pointlight.position.z=4;
			scene.add(pointlight);

			//mouse
			document.addEventListener('mousemove', animateParticles);
			let mouseX= 0;
			let mouseY =0;


			function animateParticles(event){
				mouseY= event.clientY;
				mouseX= event.clientX;
			}

			const clock= new THREE.Clock();

			camera.position.z = 10;
			function animate(){
				requestAnimationFrame(animate);

				const elapsedTime= clock.getElapsedTime();

				sphere.rotation.x+= 0.01;
				sphere.rotation.y+= 0.01;
				sphere.rotation.z+= 0.01;

				particlesMesh.rotation.y= mouseY * (elapsedTime) * 0.00008;
				
                 renderer.render( scene, camera);
			}
			animate();