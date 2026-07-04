import { motion } from 'framer-motion';
import { 
  FaLightbulb, 
  FaBuilding, 
  FaSyncAlt, 
  FaLaptopCode, 
  FaCubes, 
  FaLock, 
  FaComments, 
  FaHeadphones 
} from 'react-icons/fa';

const features = [
  {
    title: 'Innovation First',
    description: 'We continuously research and prototype new AI capabilities to deliver competitive advantages for your product.',
    icon: FaLightbulb,
    color: 'from-[#2563EB] to-[#3B82F6]'
  },
  {
    title: 'Enterprise Quality',
    description: 'We follow robust coding standards, automated testing pipelines, and rigid QA checkpoints to ensure production stability.',
    icon: FaBuilding,
    color: 'from-[#F97316] to-[#FFA048]'
  },
  {
    title: 'Agile Development',
    description: 'Weekly sprint reviews, dedicated PM dashboards, and high transparency let us pivot rapidly on feedback.',
    icon: FaSyncAlt,
    color: 'from-[#2563EB] to-[#F97316]'
  },
  {
    title: 'Modern Technologies',
    description: 'We build with state-of-the-art tech stacks including React, Node, AWS, Docker, Kubernetes, and Python.',
    icon: FaLaptopCode,
    color: 'from-[#2563EB] to-[#3B82F6]'
  },
  {
    title: 'Scalable Architecture',
    description: 'System topologies engineered from day one to handle high traffic volume, database expansion, and seamless updates.',
    icon: FaCubes,
    color: 'from-[#F97316] to-[#2563EB]'
  },
  {
    title: 'Security Focused',
    description: 'Implementation of industry standard authentication protocols (OAuth, JWT), encryption at rest and in transit, and security audits.',
    icon: FaLock,
    color: 'from-[#3B82F6] to-[#2563EB]'
  },
  {
    title: 'Transparent Communication',
    description: 'Realtime Slack workspaces, detailed project logs, and open developer access provide absolute clarity.',
    icon: FaComments,
    color: 'from-[#2563EB] to-[#3B82F6]'
  },
  {
    title: 'Dedicated Support',
    description: 'Post-deployment SLA support plans, server uptime monitoring, and active system maintenance.',
    icon: FaHeadphones,
    color: 'from-[#F97316] to-[#FFA048]'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: 'easeOut' } 
  }
};

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="w-full bg-[#F3F8FF] py-24 px-6 md:px-8 relative z-10 overflow-hidden border-t border-gray-200/20">
      
      {/* Background glow */}
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#FF8A00]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        
        {/* Title */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/10 text-xs font-bold uppercase tracking-widest text-[#F97316] mb-4"
          >
            Why Choose Us
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-tight mb-4"
          >
            Engineering Excellence & Trust
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#475569] text-base md:text-lg font-semibold"
          >
            We focus on product quality, system security, and transparent client partnerships.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                variants={itemVariants}
                className="group relative rounded-[20px] transition-all duration-300"
              >
                {/* Inner Card */}
                <div className="bg-white rounded-[19px] p-6 flex flex-col items-center text-center h-full hover:shadow-[0_10px_30px_rgba(37,99,235,0.06)] transition-all duration-300 border border-gray-200/50 premium-card">
                  
                  {/* Glowing background circles on hover */}
                  <div className="absolute inset-0 bg-[#2563EB]/0 opacity-0 group-hover:opacity-10 group-hover:bg-[#2563EB]/5 rounded-[19px] blur-xl transition-all duration-500 -z-10" />

                  {/* Animated Icon with gradient */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.color} text-white flex items-center justify-center text-2xl mb-6 shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#0F172A] mb-3 group-hover:text-[#2563EB] transition-colors">
                    {feat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#475569] text-xs leading-relaxed font-semibold">
                    {feat.description}
                  </p>

                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
