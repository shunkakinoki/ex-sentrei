import * as React from "react";
import Particles from "react-particles-js";

const ParticlesComponent = (): JSX.Element => {
  return (
    <>
      <Particles
        className="particle"
        params={{
          particles: {
            color: {
              value: "#33ffff",
            },
            number: {
              value: 160,
              density: {
                enable: false,
              },
            },
            size: {
              value: 30,
              random: true,
              anim: {
                speed: 4,
                size_min: 0.3,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              random: true,
              speed: 1,
            },
          },
          interactivity: {
            modes: {
              bubble: {
                distance: 250,
                duration: 2,
                size: 0,
                opacity: 0,
              },
              repulse: {
                distance: 400,
                duration: 4,
              },
            },
          },
        }}
      />
    </>
  );
};

export default ParticlesComponent;
