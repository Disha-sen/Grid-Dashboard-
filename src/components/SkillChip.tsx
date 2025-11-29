import React from 'react';

interface SkillChipProps {
  skill: string;
}

const SkillChip: React.FC<SkillChipProps> = ({ skill }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-700/10 transition-all hover:bg-blue-100">
      {skill}
    </span>
  );
};

interface SkillsListProps {
  skills: string[];
}

export const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {
  return (
    <div className="flex flex-wrap gap-1.5">
      {skills.slice(0, 3).map((skill, index) => (
        <SkillChip key={index} skill={skill} />
      ))}
      {skills.length > 3 && (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
          +{skills.length - 3}
        </span>
      )}
    </div>
  );
};

export default SkillChip;