import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/avatar';
import { supabase } from '../../../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface DashboardStats {
  views_today: number;
  total_posts: number;
  search_appearances: number;
}

interface Visitor {
  name: string;
  role: string;
  avatar_url: string;
}

const MOCK_VISITORS: Visitor[] = [
  {
    name: "Darlene Black",
    role: "Sports Media Club President",
    avatar_url: "https://ui-avatars.com/api/?name=Darlene+Black&background=random"
  },
  {
    name: "Theresa Steward",
    role: "Advertising Major Pre-Law",
    avatar_url: "https://ui-avatars.com/api/?name=Theresa+Steward&background=random"
  },
  {
    name: "Patrick Minute",
    role: "Graphic Designer",
    avatar_url: "https://ui-avatars.com/api/?name=Patrick+Minute&background=random"
  }
];

export const ProfileSidebarSection = (): JSX.Element => {
  const [stats, setStats] = useState<DashboardStats>({
    views_today: 36,
    total_posts: 14,
    search_appearances: 9
  });
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="w-[290px] space-y-6">
      {/* Dashboard Stats */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-sm font-semibold uppercase mb-4">Your Dashboard</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-5xl font-medium text-warning-600">{stats.views_today}</p>
              <p className="text-sm text-gray-600">views today</p>
            </div>

            <div>
              <p className="text-5xl font-medium text-warning-600">{stats.total_posts}</p>
              <p className="text-sm text-gray-600">posts views</p>
            </div>

            <div>
              <p className="text-5xl font-medium text-warning-600">{stats.search_appearances}</p>
              <p className="text-sm text-gray-600">search appearances</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Visitors */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold uppercase">Visitors</h2>
            <button className="text-sm text-primary-500 uppercase">view all</button>
          </div>

          <div className="space-y-4">
            {MOCK_VISITORS.map((visitor, index) => (
              <div key={index} className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={visitor.avatar_url} alt={visitor.name} />
                  <AvatarFallback>
                    {visitor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{visitor.name}</p>
                  <p className="text-xs text-gray-600">{visitor.role}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Card>
        <CardContent className="p-6">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            Logout
          </button>
        </CardContent>
      </Card>
    </div>
  );
};