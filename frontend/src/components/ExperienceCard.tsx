import React from "react";
import { useNavigate } from "react-router-dom";

interface ExperienceCardProps {
  _id: number;
  image: string;
  title: string;
  location: string;
  price: string;
  about: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  _id,
  image,
  title,
  location,
  price,
  about,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F0F0F0] rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <img src={image} alt={title} className="h-44 w-full object-cover" />

      {/* Content */}
      <div className="p-4">
        {/* Title + Location */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-[#161616] text-base">{title}</h3>
          <span className="text-xs text-[#161616] bg-[#D6D6D6] px-2 py-0.5 rounded">
            {location}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-[#6C6C6C] mt-1 leading-relaxed">{about}</p>

        {/* Price + Button */}
        <div className="flex justify-between items-center mt-3">
          <p className="font-semibold text-[#161616] text-sm">
            <span className="text-xs font-normal">From </span>
            <span className="text-[#161616]">₹{price}</span>
          </p>
          <button
            onClick={() => navigate(`/details/${_id}`)}
            className="bg-[#FFD643] hover:bg-yellow-500 text-[#161616] text-sm font-semibold px-4 py-2 rounded-md transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
