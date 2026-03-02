import React from 'react';
import Card from '@/components/ui/Card';
import { User, Linkedin, Twitter, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

interface TeamCardProps {
  member: TeamMember;
  className?: string;
}

export default function TeamCard({ member, className }: TeamCardProps) {
  return (
    <Card
      hover
      className={cn('group text-center p-6 lg:p-8', className)}
    >
      {/* Circular avatar placeholder */}
      <div className="mx-auto mb-5 w-28 h-28 rounded-full bg-primary-200 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
        <User className="w-12 h-12 text-primary-500" />
      </div>

      {/* Name */}
      <h3 className="font-heading font-bold text-lg text-neutral-900">
        {member.name}
      </h3>

      {/* Role */}
      <p className="text-primary-600 font-semibold text-sm mt-1">
        {member.role}
      </p>

      {/* Bio */}
      <p className="text-neutral-500 text-sm mt-3 leading-relaxed font-body">
        {member.bio}
      </p>

      {/* Social links */}
      {member.socials && (
        <div className="flex items-center justify-center gap-3 mt-5">
          {member.socials.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} LinkedIn`}
              className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-primary-100 hover:text-primary-600 transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {member.socials.twitter && (
            <a
              href={member.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} Twitter`}
              className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-primary-100 hover:text-primary-600 transition-colors duration-200"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {member.socials.instagram && (
            <a
              href={member.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} Instagram`}
              className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-primary-100 hover:text-primary-600 transition-colors duration-200"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </Card>
  );
}
