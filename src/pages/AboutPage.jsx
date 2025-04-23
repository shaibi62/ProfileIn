
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
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function About()
{
    return(
        <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About ProfileIn
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are on a mission to empower professionals worldwide by making it
            easy to create stunning portfolio websites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, ProfileIn emerged from a simple observation:
              creating a professional portfolio website was too complex for many
              talented individuals. We believed that everyone deserves to have a
              beautiful online presence, regardless of their technical skills.
            </p>
            <p className="text-gray-600">
              Today, we are proud to help thousands of professionals showcase
              their work and achieve their career goals through our platform.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-indigo-600 mb-2">10K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
            <div className="text-gray-600">Templates</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-indigo-600 mb-2">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                User-First Approach
              </h3>
              <p className="text-gray-600">
                We prioritize user experience in everything we build.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Layers className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Design</h3>
              <p className="text-gray-600">
                Every template is crafted with attention to detail.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Edit3 className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Continuous Innovation
              </h3>
              <p className="text-gray-600">
                We are always improving and adding new features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}