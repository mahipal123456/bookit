import React, { useEffect, useState } from "react";
import ExperienceCard from "./ExperienceCard";
import { useOutletContext } from "react-router-dom";

type OutletContextType = {
  searchTerm: string;
};

interface Experience {
  _id: string;
  title: string;
  location: string;
  price: string;
  image: string;
}

const ExperiencesGrid: React.FC = () => {
  const { searchTerm } = useOutletContext<OutletContextType>();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/experiences`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch experiences");
        }
        return res.json();
      })
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching experiences:", err);
        setError("Something went wrong while loading experiences.");
        setLoading(false);
      });
  }, []);

  const filteredExperiences = experiences.filter((exp) =>
    exp.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-600 text-lg">
        Loading experiences...(the backend server is running on free services it may take some time to wake up )
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20 text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {filteredExperiences.length > 0 ? (
        filteredExperiences.map((exp) => (
          <ExperienceCard key={exp._id} {...exp} />
        ))
      ) : (
        <p className="text-gray-600 col-span-full text-center text-lg">
          No experiences found.
        </p>
      )}
    </div>
  );
};

export default ExperiencesGrid;
