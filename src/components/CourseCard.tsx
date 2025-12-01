import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Clock, Star, Calendar, MessageCircle } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  modules: number;
  rating: number;
  students: number;
}

const CourseCard = ({
  id,
  title,
  description,
  duration,
  modules,
  rating,
  students,
}: CourseCardProps) => {
  return (
    <div className="glass-card card h-full flex flex-col bg-card border border-default">
      <div className="p-6 md:p-8 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
            <p className="text-secondary text-sm">{description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center">
            <Clock className="text-accent mr-2" size={16} />
            <span className="text-secondary text-sm">{duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="text-accent mr-2" size={16} />
            <span className="text-secondary text-sm">{students} students</span>
          </div>
          <div className="flex items-center">
            <Calendar className="text-accent mr-2" size={16} />
            <span className="text-secondary text-sm">4 Weeks</span>
          </div>
          <div className="flex items-center">
            <Star className="text-yellow-500 mr-2" size={16} />
            <span className="text-secondary text-sm">{rating} rating</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-xs text-secondary mb-1">
            {modules} modules
          </div>
          <div className="w-full bg-border-default rounded-full h-2">
            <div
              className="bg-primary-gradient h-2 rounded-full"
              style={{ width: `${Math.min(100, (modules / 20) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-8 pb-6">
        <div className="flex flex-col gap-3">
          <Link
            href={`/courses/${id}`}
            className="flex items-center text-accent font-semibold hover:text-primary transition-colors justify-center"
          >
            View Details
            <ArrowRight className="ml-1" size={16} />
          </Link>

          <div className="flex gap-3">
            <a
              href="https://wa.me/923189532843"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center bg-primary-gradient text-white text-sm font-semibold py-2 px-4 rounded-full hover:shadow-glow transition-all"
            >
              <MessageCircle className="mr-1" size={16} />
              Contact
            </a>

            <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold py-2 px-4 rounded-full hover:shadow-glow transition-all">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;