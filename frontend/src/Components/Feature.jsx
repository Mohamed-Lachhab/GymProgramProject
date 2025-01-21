import React from 'react';
import Featurebox from './Featurebox';
import fimage1 from '../images/1.svg';
import fimage2 from '../images/2.svg';
import fimage3 from '../images/3.svg';
import fimage4 from '../images/4.svg';

function Feature() {
  return (
    <section id="features" className="py-5 bg-black text-white text-center">
      <div className="container">
        <h1 className="mb-4">FEATURES</h1>
        <div className="row">
          <Featurebox image={fimage1} title="WeightLifting" />
          <Featurebox image={fimage2} title="Specific Muscle" />
          <Featurebox image={fimage3} title="Flex Your Muscle" />
          <Featurebox image={fimage4} title="Cardio Exercises" />
        </div>
      </div>
    </section>
  );
}

export default Feature;
