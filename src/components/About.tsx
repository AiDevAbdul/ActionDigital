// src/components/About.tsx

'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            About Our Institute
          </p>
          <h2 className="section-title text-primary">
            Empowering Digital Transformation
          </h2>
          <p className="section-subtitle text-secondary">
            Vision, mission, and journey of our digital institute
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl font-bold text-primary mb-6">Our Story</h3>
            <p className="text-secondary mb-4">
              Founded with a vision to bridge the digital skills gap, Action Digital Institute (ADI) was established to empower individuals and businesses with cutting-edge technology knowledge. We are committed to providing inclusive, comprehensive and transformative IT skills training to individuals, empowering them to overcome poverty, initiate and excel in business ventures, and contribute meaningfully to the society.
            </p>
            <p className="text-secondary mb-4">
              Our innovative programs aim to cultivate inclusive business leadership, fostering a diverse and thriving entrepreneurial ecosystem that drives sustainable socio-economic development. Through strategic technical guidance and leveraging social media & cutting-edge marketing techniques, we accelerate economic growth for startups, small, and medium businesses nationwide.
            </p>
            <p className="text-secondary">
              We have successfully provided training in 10+ essential digital skills to our students, complemented by a 1-month incubation support program where students work on ADI clients' marketing projects practically and earn money from their marketing services during the incubation period.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card card p-8"
          >
            <div className="bg-primary-gradient p-4 rounded-lg mb-6 inline-block">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-secondary">
              Our mission is to provide inclusive, comprehensive and transformative IT skills training to individuals, empowering them to overcome poverty, initiate and excel in business ventures, and contribute meaningfully to the society. We aim to cultivate inclusive business leadership, fostering a diverse and thriving entrepreneurial ecosystem that drives sustainable socio-economic development. To empower startups, small, and medium businesses nationwide, we provide strategic technical guidance and leverage social media & cutting-edge marketing techniques to accelerate economic growth in the country.
            </p>
          </motion.div>
        </div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card card p-8 mb-20"
        >
          <div className="flex items-center mb-6">
            <Target className="w-10 h-10 text-accent mr-4" />
            <h3 className="text-3xl font-bold text-primary">Our Vision</h3>
          </div>
          <p className="text-secondary text-lg">
            Empower individuals & businesses inclusively especially women entrepreneurs through transformative IT & AI skills, transcending barriers to poverty, contribute meaningfully to communities, economy and emerge as visionary business leaders of the digital age.
          </p>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-primary text-center mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card card p-6 text-center">
              <Award className="w-12 h-12 text-accent mx-auto mb-4" />
              <h4 className="text-xl font-bold text-primary mb-3">Client-Centric</h4>
              <p className="text-secondary">Prioritizing the needs and goals of our clients to deliver tailored solutions that drive results and create value.</p>
            </div>
            <div className="glass-card card p-6 text-center">
              <Users className="w-12 h-12 text-accent mx-auto mb-4" />
              <h4 className="text-xl font-bold text-primary mb-3">Innovation</h4>
              <p className="text-secondary">Staying ahead of industry trends and continuously updating our training programs and marketing strategies.</p>
            </div>
            <div className="glass-card card p-6 text-center">
              <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
              <h4 className="text-xl font-bold text-primary mb-3">Experienced Team</h4>
              <p className="text-secondary">Our team of experts ensures the highest quality of service delivery with extensive experience and expertise.</p>
            </div>
            <div className="glass-card card p-6 text-center">
              <Target className="w-12 h-12 text-accent mx-auto mb-4" />
              <h4 className="text-xl font-bold text-primary mb-3">Collaborative Partnerships</h4>
              <p className="text-secondary">Collaborating with industry leaders, educational institutions, and community organizations to amplify our impact.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;