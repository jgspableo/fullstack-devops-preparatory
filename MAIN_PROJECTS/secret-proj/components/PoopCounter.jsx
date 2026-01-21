import { useEffect, useRef, useState } from "react";
import { Engine, World, Bodies, Runner, Composite, Body } from "matter-js";
import PoopFace from "./PoopFace";
import "./styles/poopCounter.css";

let nextId = 0;

function PoopCounter() {
  const innerRef = useRef(null); // actual glass area
  const engineRef = useRef(null);
  const runnerRef = useRef(null);

  const [bounds, setBounds] = useState(null); // { width, height }
  const [poops, setPoops] = useState([]); // { id, body, scale, physicsRadius, x, y, angle, isNew }

  const BASE_WIDTH = 52;
  const BASE_HEIGHT = 55;
  const BASE_RADIUS = BASE_WIDTH / 2; // 26

  // 1) Setup physics once we know the inner beaker size
  useEffect(() => {
    if (!innerRef.current) return;

    const rect = innerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    setBounds({ width, height });

    const engine = Engine.create({
      gravity: { x: 0, y: 1.25 },
    });

    // make solver a bit more accurate to reduce visible overlap
    engine.positionIterations = 10;
    engine.velocityIterations = 8;
    engine.constraintIterations = 4;

    engineRef.current = engine;

    const wallThickness = 40;
    const floorPadding = 6; // raise the floor slightly so sprites don't cover the border

    // ground inside the glass, a bit above the bottom edge
    const ground = Bodies.rectangle(
      width / 2,
      height - floorPadding + wallThickness / 2,
      width,
      wallThickness,
      { isStatic: true }
    );

    // side walls tucked just inside the glass so edges feel right
    const leftWall = Bodies.rectangle(
      -wallThickness / 2 + 2,
      height / 2,
      wallThickness,
      height * 2,
      { isStatic: true }
    );

    const rightWall = Bodies.rectangle(
      width + wallThickness / 2 - 2,
      height / 2,
      wallThickness,
      height * 2,
      { isStatic: true }
    );

    World.add(engine.world, [ground, leftWall, rightWall]);

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // sync physics bodies -> React state each frame
    let frameId;
    const update = () => {
      const allBodies = Composite.allBodies(engine.world).filter(
        (b) => b.label === "poop"
      );

      setPoops((prev) =>
        prev.map((p) => {
          const body = allBodies.find((b) => b.id === p.body.id) || p.body;
          return {
            ...p,
            body,
            x: body.position.x,
            y: body.position.y,
            angle: body.angle,
          };
        })
      );

      frameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(frameId);
      if (runnerRef.current) Runner.stop(runnerRef.current);
      if (engineRef.current) {
        World.clear(engineRef.current.world, false);
        Engine.clear(engineRef.current);
      }
    };
  }, []);

  // 2) Add a new poop with random scale and matching physics radius
  const handleAddPoop = () => {
    if (!engineRef.current || !bounds) return;

    const engine = engineRef.current;
    const { width } = bounds;

    // visual scale of base poop
    const minScale = 0.8;
    const maxScale = 1.2;
    const scale = minScale + Math.random() * (maxScale - minScale);

    const visualRadius = BASE_RADIUS * scale;

    // physics radius slightly smaller so collisions happen inside the sprite,
    // which visually reduces overlaps and keeps the bottom cleaner
    const physicsRadius = visualRadius * 0.9;

    const margin = physicsRadius + 4;
    const spawnX = margin + Math.random() * (width - margin * 2);
    const spawnY = -50; // above the inner glass

    const body = Bodies.circle(spawnX, spawnY, physicsRadius, {
      label: "poop",
      restitution: 0.12, // low bounce so they settle
      friction: 0.8,
      frictionAir: 0.06,
      density: 0.0014,
    });

    // initial velocity + spin so it feels alive
    Body.setVelocity(body, {
      x: (Math.random() - 0.5) * 2.2,
      y: 4.2 + Math.random() * 1.8,
    });
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.5);

    World.add(engine.world, body);

    const id = nextId++;
    setPoops((prev) => [
      ...prev,
      {
        id,
        body,
        scale,
        physicsRadius,
        x: spawnX,
        y: spawnY,
        angle: 0,
        isNew: true,
      },
    ]);

    setTimeout(() => {
      setPoops((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isNew: false } : p))
      );
    }, 600);
  };

  return (
    <div className="poop-counter">
      <h1 className="poop-title">
        Poop Beaker <span>💩</span>
      </h1>

      <div className="poop-beaker">
        <div className="poop-beaker-inner" ref={innerRef}>
          {bounds &&
            poops.map((p) => {
              const { scale, x, y, angle, id, isNew } = p;

              return (
                <div
                  key={id}
                  className={
                    "poop-physics-wrapper" +
                    (isNew ? " poop-physics-wrapper--new" : "")
                  }
                  style={{
                    width: BASE_WIDTH,
                    height: BASE_HEIGHT,
                    transform: `
                      translate(${x - BASE_RADIUS}px, ${y - BASE_HEIGHT / 2}px)
                      rotate(${angle}rad)
                      scale(${scale})
                    `,
                  }}
                >
                  {/* pass headAngle so eyes can compensate for rotation */}
                  <PoopFace headAngle={angle} />
                </div>
              );
            })}
        </div>
      </div>

      <div className="poop-count">Poops: {poops.length}</div>

      <button className="poop-button" onClick={handleAddPoop}>
        +1 poop
      </button>
    </div>
  );
}

export default PoopCounter;
