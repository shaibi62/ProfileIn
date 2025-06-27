import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { handleSuccessToast, handleErrorToast } from '../utils';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useState } from "react";
export default function Contact()
{
  const navigate = useNavigate();
  const {user} = useAuth();
  const [formData, setFormData ]= useState({
    Name: '',
    Email : '',
    Message: ''
})

  const [feedBack, setFeedBack ]= useState({
    Star : '',
    Message: ''
})
  
  const handleFeedChange = (e)=>{
    const { name, value } = e.target;
    setFeedBack((prev) => ({ ...prev, [name]: value }));

  }
  const handleChange = (e)=>{
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

  }
  const handleSubmit = async (e) => {
  e.preventDefault();
  const { Name, Email, Message } = formData;

  try {
    const response = await axios.post('http://localhost/Profilein-Backend/contactus.php', {
      Name,
      Email,
      Message
    }, {
      withCredentials: true
    });
    alert(response.data.message);
if(response.data.success) {
    setFormData({ Name: '', Email: '', Message: '' }); // Reset form
    navigate('/'); // Redirect to home page after successful submission
}  
  } catch (error) {
    handleErrorToast("An error occurred while sending the message.", error);

  }
};

  const handleSubmitFeedback = async (e) => {
  e.preventDefault();
  const userId = user?.id;
  const { Star, Message } = feedBack;

  try {
    const response = await axios.post('http://localhost/Profilein-Backend/feedback.php', {
      userId,
      Star,
      Message
    }, { withCredentials: true });
    handleSuccessToast(response.data.message);
    if (response.data.success) {
    setFeedBack({ Star: '', Message: '' }); // Reset feedback form
    navigate('/'); // Redirect to home page after successful feedback submission  
    }
  } catch (error) {
    handleErrorToast("An error occurred while submitting feedback.", error);
  }
};

    return(
      <div className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? We are here to help. Reach out to our team and we
            will get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-sky-200 ">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Any query?
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="Name"
                  onChange={handleChange}
                  className="mt-1 px-2 py-2 block w-[45%] rounded-lg border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  onChange={handleChange}
                  className="mt-1 px-2 py-2 block w-[45%] rounded-lg border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder=" your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  name="Message"
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 px-2 py-2 block w-[45%] rounded-lg border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder=" Your Message"
                  

                />
              </div>
              <button
                type="submit"
                className="w-45  bg-blue-600 text-white px-2 py-2 rounded-lg mx-8 block"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-lg border border-sky-200 ">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Other Ways to Reach Us
            </h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-indigo-600 mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-blue-600">Email</h3>
                  <p className="text-gray-600">contact.profilein@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-indigo-600 mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-blue-600">Phone</h3>
                  <p className="text-gray-600">+92 315-1485465</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-indigo-600 mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-blue-600">Office</h3>
                  <p className="text-gray-600">
                  
                   
                    Mandi Bahauddin, Pakistan
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-blue-600 mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          
        </div>
        {user &&
            <div className="bg-white p-8 my-3 w-1/2 mx-auto  rounded-xl shadow-lg border border-sky-200 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Rate ProfileIn
            </h2>
            <form className="space-y-6" onSubmit={handleSubmitFeedback}>
            
             
                <div>
                <label
                  htmlFor="Rating"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rating
                </label>
                <select 
                  name="Star"
                  onChange={handleFeedChange}  className="mt-1 p-2 w-full block rounded-lg border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                 >
                  <option value={1}>1 star</option>
                  <option value={2}>2 star</option>
                  <option value={3}>3 star</option>
                  <option value={4}>4 star</option>
                  <option value={5}>5 star</option>

                 </select>
               
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  name="Message"
                  onChange={handleFeedChange}
                  rows={4}
                  className="mt-1 p-2 w-full rounded-lg border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder=" Your Message"
                  

                />
              </div>
              <button
                type="submit"
                className="w-45  bg-blue-600 text-white px-2 py-2 rounded-lg mx-8 block"
              >
                Send Feedback
              </button>
            </form>
          </div>
          }
      </div>
    </div>
    );
}