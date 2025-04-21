import PropTypes from "prop-types";
import {
  Layers,
  Users,
  BarChart,
  Edit3,
  Smartphone,
  BookOpen,
  Menu,
  X,
  Star,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
export default function HomePage() {
  return (
    <div className="px-5">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Create Your Professional Portfolio
              <br />
              <span className="text-indigo-600">in Minutes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Empower your professional journey with a stunning portfolio
              website. No technical skills required - just your achievements and
              our templates.
            </p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors">
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Everything You Need to Showcase Your Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Layers className="w-8 h-8 text-indigo-600" />}
              title="Industry-Specific Templates"
              description="Choose from a variety of professionally designed templates tailored to your field."
            />
            <FeatureCard
              icon={<Edit3 className="w-8 h-8 text-indigo-600" />}
              title="Real-Time Editing"
              description="Update your portfolio instantly with our intuitive editing interface."
            />
            <FeatureCard
              icon={<Smartphone className="w-8 h-8 text-indigo-600" />}
              title="Responsive Design"
              description="Your portfolio looks perfect on every device, from mobile to desktop."
            />
            <FeatureCard
              icon={<BarChart className="w-8 h-8 text-indigo-600" />}
              title="Analytics Tools"
              description="Track visitor engagement and portfolio performance with built-in analytics."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-indigo-600" />}
              title="Built for Everyone"
              description="No technical skills needed - perfect for freelancers, artists, and professionals."
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-indigo-600" />}
              title="Guided Experience"
              description="Step-by-step tutorials and support to help you create the perfect portfolio."
            />
          </div>
        </div>
      </section>

      {/* User Feedback Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Johnson"
              role="Freelance Designer"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
              content="ProfileIn made creating my portfolio a breeze. The templates are beautiful and the interface is so intuitive. I had my site up in less than an hour!"
            />
            <TestimonialCard
              name="Michael Chen"
              role="Software Developer"
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
              content="As a developer, I appreciate the clean design and robust features. The analytics tools are particularly helpful in tracking my portfolio's performance."
            />
            <TestimonialCard
              name="Emily Rodriguez"
              role="Photographer"
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
              content="The image galleries and responsive design make my photography portfolio look stunning on any device. Highly recommended for creatives!"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Enhance Your Professional Presence?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of professionals who have already created stunning
            portfolios with ProfileIn.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors">
            Start Building Now
          </button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
function TestimonialCard({ name, role, image, content }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center mb-4">
          <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-gray-600 text-sm">{role}</p>
          </div>
        </div>
        <div className="mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-5 h-5 text-yellow-400 inline-block" />
          ))}
        </div>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
}
