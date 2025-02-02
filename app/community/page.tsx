"use client";

import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

const Page = () => {
  const { user } = useUser();
  const email = user?.emailAddresses[0].emailAddress;
  const community = useMutation(api.community.community);
  const getAllCommunityMessages = useQuery(api.community.getAllCommunity);
  
  const [communityMessage, setCommunityMessage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const isAdmin = email === process.env.NEXT_PUBLIC_isAdmin;

  const handleCommunityUpload = async () => {
    if (!communityMessage.trim()) return;
    setIsUploaded(false);

    try {
      await community({
        userId: user?.id!,
        name: user?.fullName!,
        suggestions: communityMessage,
      });

      toast({
        title: "Feedback Received!",
        description: "Thank you for your valuable feedback. 😊",
        variant: "default",
      });

      setIsUploaded(true);
      setCommunityMessage(""); // Clear textarea after submission
    } catch (error) {
      toast({
        title: "Failed to Send Feedback",
        description: "Please try again in a few minutes",
        variant: "destructive",
      });
      setIsUploaded(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {isAdmin ? (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Community Feedback</h2>
          <div className="space-y-4">
            {getAllCommunityMessages?.length ? (
              getAllCommunityMessages.map((item, index) => (
                <Card key={index} className="p-4 border border-gray-300 shadow-md rounded-lg bg-white">
                  <h3 className="text-lg font-semibold text-blue-600">{item.name}</h3>
                  <p className="text-gray-700 mt-1">{item.suggestions}</p>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-600">No feedback available yet.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
            
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Hello! Post Your Suggestions
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Your feedback on our food and services is highly appreciated!
                </p>
                <Textarea
                  placeholder="Write your feedback or suggestions here..."
                  className="w-full border-gray-300 rounded-lg p-3 text-gray-700 focus:ring focus:ring-blue-300"
                  value={communityMessage}
                  onChange={(e) => setCommunityMessage(e.target.value)}
                />
                <Button
                  className={!isUploaded?"mt-4 w-full bg-orange-600 text-white hover:bg-orange-700 transition":
                    "mt-4 w-full bg-green-600 text-white hover:bg-green-700 transition"
                  }
                  onClick={handleCommunityUpload}
                  disabled={!communityMessage.trim()}
                >
                  {isUploaded ? "Sent!" : "Send"}
                </Button>
              </div>
            
             
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
