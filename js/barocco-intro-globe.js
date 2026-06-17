(function () {
    'use strict';

    if (window.innerWidth <= 600) return;   /* no globe on mobile */

    var canvas = document.querySelector('.bintro-globe-canvas');
    var labels = document.querySelectorAll('.bgl');
    if (!canvas) return;

    function waitThree() {
        if (typeof THREE === 'undefined') { setTimeout(waitThree, 50); return; }
        launch();
    }

    function launch() {
        var W = 0, H = 0;

        var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

        var scene  = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
        camera.position.z = 3;

        /* ── Particle sphere (Fibonacci distribution) ── */
        var N      = 1400;
        var pos    = new Float32Array(N * 3);
        var col    = new Float32Array(N * 3);
        var golden = Math.PI * (3 - Math.sqrt(5));
        var tc     = new THREE.Color();

        for (var j = 0; j < N; j++) {
            var y  = 1 - (j / (N - 1)) * 2;
            var rr = Math.sqrt(Math.max(0, 1 - y * y));
            var th = golden * j;
            pos[j*3]   = rr * Math.cos(th);
            pos[j*3+1] = y;
            pos[j*3+2] = rr * Math.sin(th);
            tc.setHSL(0.03 + (j / N) * 0.08, 0.45 + (j / N) * 0.2, 0.54 + (j / N) * 0.2);
            col[j*3]   = tc.r;
            col[j*3+1] = tc.g;
            col[j*3+2] = tc.b;
        }

        var geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
        var mat = new THREE.PointsMaterial({
            size: 0.017, vertexColors: true,
            transparent: true, opacity: 0.82, sizeAttenuation: true,
        });
        var globe = new THREE.Points(geo, mat);
        scene.add(globe);

        /* ── 3 orbiting moons ── */
        var orbits = [
            { a: 0.0,  incl:  0.38, speed: 0.38, r: 1.52 }, /* Vivaldi */
            { a: 2.09, incl: -0.55, speed: 0.24, r: 1.68 }, /* Bach    */
            { a: 4.19, incl:  0.72, speed: 0.31, r: 1.60 }, /* Rameau  */
        ];

        var moons = orbits.map(function () {
            var mg = new THREE.SphereGeometry(0.036, 8, 8);
            var mm = new THREE.MeshBasicMaterial({ color: 0xc37a6b });
            var mesh = new THREE.Mesh(mg, mm);
            scene.add(mesh);
            return mesh;
        });

        var v3 = new THREE.Vector3();

        function resize() {
            var wrap = canvas.parentElement;
            W = wrap.offsetWidth  || window.innerWidth  / 2;
            H = wrap.offsetHeight || window.innerHeight;
            renderer.setSize(W, H, false);
            camera.aspect = W / H;
            camera.updateProjectionMatrix();
        }

        function tick(ts) {
            var t = ts * 0.001;
            globe.rotation.y = t * 0.09;
            globe.rotation.x = Math.sin(t * 0.035) * 0.13;

            orbits.forEach(function (orb, i) {
                var a  = orb.a + t * orb.speed;
                var mx = Math.cos(a) * orb.r;
                var my = Math.sin(orb.incl) * Math.sin(t * orb.speed * 0.55 + orb.a) * 0.55;
                var mz = Math.sin(a) * orb.r;
                moons[i].position.set(mx, my, mz);

                v3.copy(moons[i].position).project(camera);
                var sx = ( v3.x * 0.5 + 0.5) * W;
                var sy = (-v3.y * 0.5 + 0.5) * H;

                if (labels[i]) {
                    labels[i].style.left    = sx + 'px';
                    labels[i].style.top     = sy + 'px';
                    labels[i].style.opacity = v3.z > 1 ? '0' : '1';
                }
            });

            renderer.render(scene, camera);
            requestAnimationFrame(tick);
        }

        resize();
        window.addEventListener('resize', resize);
        requestAnimationFrame(tick);
    }

    waitThree();
})();
