"use client";

import { baseURL } from "@/lib/footballApi";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface PlayerRatingProps {
  playerId: string | number;
  teamId: string | number;
}

const PlayerRating = ({ playerId, teamId }: PlayerRatingProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [existingRating, setExistingRating] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${baseURL}/api/rating`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 10 },
          body: JSON.stringify({ playerId }),
        });

        if (response.status == 500) {
          console.error("Failed to fetch rating");
        }

        const data = await response.json();

        console.log(data);
        if (data.playerRating) {
          setExistingRating(data.playerRating);
          setRating(data.playerRating);
        }
      } catch (error) {
        console.error("Error fetching rating:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRating();
  }, [playerId]);

  const handleRating = async (newRating: number) => {
    try {
      const response = await fetch(`${baseURL}/api/rating/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerId,
          playerRating: newRating,
          teamId,
        }),
      });

      if (!response.ok) {
        console.error("Failed to add rating");
      }

      setRating(newRating);
      setExistingRating(newRating);
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  const handleMouseEnter = (newRating: number) => {
    setHoveredRating(newRating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  if (isLoading) {
    return <div>Loading rating...</div>;
  }

  return (
    <div className="flex items-center space-x-1 bg-secondary rounded-lg p-6">
      {[...Array(10)].map((_, index) => {
        const starRating = index + 1;
        const isSelected = starRating <= (hoveredRating || rating);
        return (
          <div
            key={starRating}
            onClick={() => handleRating(starRating)}
            onMouseEnter={() => handleMouseEnter(starRating)}
            onMouseLeave={handleMouseLeave}
            className="cursor-pointer"
          >
            <Star
              size={24}
              className={`text-yellow-500 transition-all ${
                isSelected ? "fill-yellow-500" : "fill-transparent"
              }`}
            />
          </div>
        );
      })}
      <div className="ml-2 text-sm text-gray-300">
        {existingRating
          ? `Existing Rating: ${existingRating} / 10`
          : rating > 0
          ? `Your Rating: ${rating} / 10`
          : "Rate (1-10)"}
      </div>
    </div>
  );
};

export default PlayerRating;
