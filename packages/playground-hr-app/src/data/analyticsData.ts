import { type TeamMember, type Skill, type SkillCategory } from './teamMembers';
export type { Skill, SkillCategory } from './teamMembers';

export interface StatItem {
    type: 'members' | 'experience' | 'skills' | 'tenure';
    value: string;
    label: string;
    color: 'purple' | 'blue' | 'orange' | 'green';
}

export interface SkillItem {
    name: string;
    count: number;
}

export type ExperienceRange = '0-3' | '3-5' | '5-7' | '7-10' | '10+';
export type TenureRange = '0-1' | '1-2' | '2-3' | '3-5' | '5+';

export interface DistributionItem<T extends string = string> {
    label: T;
    value: number;
}

export interface SkillsDistributionItem {
    name: SkillCategory;
    percentage: number;
    members: string;
    color: string;
    colorClass: string;
}

export interface SeniorityItem {
    level: string;
    range: string;
    count: number;
    color: 'purple' | 'blue' | 'orange' | 'green';
}

export interface PerformanceItem {
    title: string;
    description: string;
}

export type AnalyticsData = {
    stats: StatItem[];
    topSkills: SkillItem[];
    experienceDistribution: DistributionItem<ExperienceRange>[];
    tenureDistribution: DistributionItem<TenureRange>[];
    skillsDistribution: SkillsDistributionItem[];
    seniority: SeniorityItem[];
    performance: PerformanceItem;
};

const parseYears = (str: string): number => {
    return parseFloat(str.replace('y', '')) || 0;
};

const SKILL_CATEGORIES: Record<Exclude<SkillCategory, 'Other'>, Skill[]> = {
    'Design': ['UI Design', 'UX Design', 'Visual Design', 'Product Design', 'Interaction Design', 'Motion Design', 'Branding', 'Illustration', 'Animation', 'Design Systems', 'Design Leadership'],
    'Research': ['User Research', 'Data Analysis', 'Usability Testing', 'Qualitative Research', 'Ethnography', 'UX Strategy', 'Service Design', 'Business Analysis'],
    'Development': ['Front-end Development', 'React', 'CSS', 'Prototyping', 'Figma', 'Wireframing'],
    'Content': ['UX Writing', 'Content Strategy', 'Voice & Tone'],
    'Leadership': ['Strategy', 'Team Management', 'Product Strategy', 'Roadmapping', 'Stakeholder Management', 'Workshop Facilitation', 'Workshops', 'Information Architecture', 'Accessibility', 'Micro-interactions']
};

const getSkillCategory = (skill: string): SkillCategory => {
    for (const [category, skills] of Object.entries(SKILL_CATEGORIES) as [SkillCategory, Skill[]][]) {
        if (skills.includes(skill as Skill)) {
            return category;
        }
    }
    return 'Other';
};

const getSeniorityLevel = (experience: number): string => {
    if (experience < 3) return 'Junior';
    if (experience < 6) return 'Mid-Level';
    if (experience < 9) return 'Senior';
    return 'Lead';
};

export const generateAnalyticsData = (members: TeamMember[]): AnalyticsData => {
    // Stats
    const totalMembers = members.length;
    const avgExperience = members.reduce((sum, m) => sum + parseYears(m.experience), 0) / totalMembers;
    const allSkills = members.flatMap(m => m.skills);
    const uniqueSkills = new Set(allSkills).size;
    const avgTenure = members.reduce((sum, m) => sum + parseYears(m.tenure), 0) / totalMembers;

    const stats: StatItem[] = [
        { type: 'members', value: totalMembers.toString(), label: 'Team Members', color: 'purple' },
        { type: 'experience', value: avgExperience.toFixed(1), label: 'Avg Years Experience', color: 'blue' },
        { type: 'skills', value: uniqueSkills.toString(), label: 'Unique Skills', color: 'orange' },
        { type: 'tenure', value: avgTenure.toFixed(1), label: 'Avg Tenure (Years)', color: 'green' }
    ];

    // Top Skills
    const skillCounts = allSkills.reduce((acc, skill) => {
        acc[skill] = (acc[skill] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const topSkills = Object.entries(skillCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));

    // Experience Distribution
    const expRanges: { label: ExperienceRange; min: number; max: number }[] = [
        { label: '0-3', min: 0, max: 3 },
        { label: '3-5', min: 3, max: 5 },
        { label: '5-7', min: 5, max: 7 },
        { label: '7-10', min: 7, max: 10 },
        { label: '10+', min: 10, max: Infinity }
    ];

    const experienceDistribution = expRanges.map(range => ({
        label: range.label,
        value: members.filter(m => {
            const exp = parseYears(m.experience);
            return exp >= range.min && exp < range.max;
        }).length
    }));

    // Tenure Distribution
    const tenureRanges: { label: TenureRange; min: number; max: number }[] = [
        { label: '0-1', min: 0, max: 1 },
        { label: '1-2', min: 1, max: 2 },
        { label: '2-3', min: 2, max: 3 },
        { label: '3-5', min: 3, max: 5 },
        { label: '5+', min: 5, max: Infinity }
    ];

    const tenureDistribution = tenureRanges.map(range => ({
        label: range.label,
        value: members.filter(m => {
            const tenure = parseYears(m.tenure);
            return tenure >= range.min && tenure < range.max;
        }).length
    }));

    // Skills Distribution by Category
    const categoryColors: Record<Exclude<SkillCategory, 'Other'>, { color: string; colorClass: string }> = {
        'Design': { color: '#f59e0b', colorClass: 'purple' },
        'Research': { color: '#3b82f6', colorClass: 'blue' },
        'Development': { color: '#14b8a6', colorClass: 'green' },
        'Content': { color: '#ef4444', colorClass: 'red' },
        'Leadership': { color: '#fb923c', colorClass: 'orange' }
    };

    const categoryCounts = allSkills.reduce((acc, skill) => {
        const category = getSkillCategory(skill);
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {} as Record<SkillCategory, number>);

    const totalCategoryCount = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

    const top4Categories = (Object.entries(categoryCounts) as [SkillCategory, number][])
        .filter(([cat]) => cat !== 'Other')
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4);

    const top4Total = top4Categories.reduce((sum, [, count]) => sum + count, 0);

    const skillsDistribution = top4Categories
        .map(([name, count]) => ({
            name,
            percentage: Math.round((count / top4Total) * 100),
            members: `${count} skills`,
            color: categoryColors[name as Exclude<SkillCategory, 'Other'>]?.color || '#9ca3af',
            colorClass: categoryColors[name as Exclude<SkillCategory, 'Other'>]?.colorClass || 'gray'
        }));

    // Seniority Breakdown
    const seniorityLevels = [
        { level: 'Junior', range: '0-3 years', color: 'purple' as const },
        { level: 'Mid-Level', range: '3-6 years', color: 'blue' as const },
        { level: 'Senior', range: '6-9 years', color: 'orange' as const },
        { level: 'Lead', range: '9+ years', color: 'green' as const }
    ];

    const seniority: SeniorityItem[] = seniorityLevels.map(level => ({
        ...level,
        count: members.filter(m => getSeniorityLevel(parseYears(m.experience)) === level.level).length
    }));

    // Performance Summary
    const performance = {
        title: 'Strong Team Performance',
        description: `Your team of ${totalMembers} members shows excellent skill diversity with ${uniqueSkills} unique skills and an average of ${avgExperience.toFixed(1)} years of experience.`
    };

    return {
        stats,
        topSkills,
        experienceDistribution,
        tenureDistribution,
        skillsDistribution,
        seniority,
        performance
    };
};