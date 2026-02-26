export type DesignSkill = 'UI Design' | 'UX Design' | 'Visual Design' | 'Product Design' | 'Interaction Design' | 'Motion Design' | 'Branding' | 'Illustration' | 'Animation' | 'Design Systems' | 'Design Leadership';
export type ResearchSkill = 'User Research' | 'Data Analysis' | 'Usability Testing' | 'Qualitative Research' | 'Ethnography' | 'UX Strategy' | 'Service Design' | 'Business Analysis';
export type DevelopmentSkill = 'Front-end Development' | 'React' | 'CSS' | 'Prototyping' | 'Figma' | 'Wireframing';
export type ContentSkill = 'UX Writing' | 'Content Strategy' | 'Voice & Tone';
export type LeadershipSkill = 'Strategy' | 'Team Management' | 'Product Strategy' | 'Roadmapping' | 'Stakeholder Management' | 'Workshop Facilitation' | 'Workshops' | 'Information Architecture' | 'Accessibility' | 'Micro-interactions';

export type Skill = DesignSkill | ResearchSkill | DevelopmentSkill | ContentSkill | LeadershipSkill;
export type SkillCategory = 'Design' | 'Research' | 'Development' | 'Content' | 'Leadership' | 'Other';

export type TeamMember =  {
    id: string;
    initials: string;
    name: string;
    title: string;
    location: string;
    tenure: string;
    experience: string;
    skills: Skill[];
    role: string;
    avatarColor: string;
    profileImage: string | null;
    email: string;
    phone: string;
    about: string;
    relationship: string;
    relationshipType: string;
}

export const teamMembersData: TeamMember[] = [
    {
        id: '1',
        initials: 'AR',
        name: 'Alex Rivera',
        title: 'Design Director',
        location: 'San Francisco, CA',
        tenure: '5.2y',
        experience: '12y',
        skills: ['Design Leadership', 'Strategy', 'Team Management', 'Design Systems', 'Stakeholder Management'],
        role: 'Manager',
        avatarColor: '#9B59B6',
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        email: 'alex.rivera@company.com',
        phone: '+1 (415) 555-0101',
        about: 'Passionate design leader with over a decade of experience building and scaling design teams. Focused on creating user-centered products that drive business impact.',
        relationship: 'Alex leads the product team',
        relationshipType: 'Team lead'
    },
    {
        id: '2',
        initials: 'MN',
        name: 'Morgan Nguyen',
        title: 'Senior Frontend Engineer',
        location: 'Portland, OR',
        tenure: '3.8y',
        experience: '8y',
        skills: ['Front-end Development', 'React', 'CSS', 'Design Systems', 'Accessibility'],
        role: 'Senior Member',
        avatarColor: '#2ECC71',
        profileImage: null,
        email: 'morgan.nguyen@company.com',
        phone: '+1 (503) 555-0106',
        about: 'Frontend engineer who bridges design and engineering. Builds performant, accessible component libraries and champions design system adoption.',
        relationship: 'Morgan reports to Alex Rivera',
        relationshipType: 'Senior contributor'
    },
    {
        id: '3',
        initials: 'SF',
        name: 'Sam Foster',
        title: 'UX Researcher',
        location: 'Austin, TX',
        tenure: '2.1y',
        experience: '4y',
        skills: ['User Research', 'Data Analysis', 'Usability Testing', 'Qualitative Research', 'Prototyping'],
        role: 'Team',
        avatarColor: '#1ABC9C',
        profileImage: 'https://randomuser.me/api/portraits/men/45.jpg',
        email: 'sam.foster@company.com',
        phone: '+1 (512) 555-0103',
        about: 'Data-driven UX researcher dedicated to understanding user behavior. Combines qualitative and quantitative methods to uncover actionable insights.',
        relationship: 'Sam reports to Alex Rivera',
        relationshipType: 'Team member'
    },
    {
        id: '4',
        initials: 'EV',
        name: 'Elena Vasquez',
        title: 'Content Strategist',
        location: 'Miami, FL',
        tenure: '1.2y',
        experience: '3.5y',
        skills: ['Content Strategy', 'UX Writing', 'Voice & Tone', 'User Research', 'Information Architecture'],
        role: 'Team',
        avatarColor: '#E91E63',
        profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
        email: 'elena.vasquez@company.com',
        phone: '+1 (305) 555-0108',
        about: 'Content strategist who crafts clear, empathetic language across products. Believes words are a design material.',
        relationship: 'Elena reports to Alex Rivera',
        relationshipType: 'Team member'
    },
    {
        id: '5',
        initials: 'DW',
        name: 'Devon Williams',
        title: 'Junior Product Designer',
        location: 'Denver, CO',
        tenure: '0.6y',
        experience: '2y',
        skills: ['UI Design', 'Prototyping', 'Figma', 'Visual Design', 'Wireframing'],
        role: 'Team',
        avatarColor: '#00BCD4',
        profileImage: null,
        email: 'devon.williams@company.com',
        phone: '+1 (720) 555-0109',
        about: 'Early-career designer eager to grow. Focused on learning user-centered design principles and building a strong portfolio.',
        relationship: 'Devon reports to Alex Rivera',
        relationshipType: 'Team member'
    },
    {
        id: '6',
        initials: 'OP',
        name: 'Olivia Patel',
        title: 'Product Manager',
        location: 'Chicago, IL',
        tenure: '2.5y',
        experience: '9y',
        skills: ['Product Strategy', 'Roadmapping', 'Stakeholder Management', 'Data Analysis', 'Workshop Facilitation'],
        role: 'Manager',
        avatarColor: '#E67E22',
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
        email: 'olivia.patel@company.com',
        phone: '+1 (312) 555-0110',
        about: 'Product manager with a design background. Passionate about aligning business goals with user needs through data-informed roadmaps.',
        relationship: 'Olivia partners with the team on product strategy',
        relationshipType: 'Cross-functional partner'
    },
    {
        id: '7',
        initials: 'LC',
        name: 'Liam Chen',
        title: 'Interaction Designer',
        location: 'Los Angeles, CA',
        tenure: '1.5y',
        experience: '4.5y',
        skills: ['Interaction Design', 'Motion Design', 'Prototyping', 'UI Design', 'Figma'],
        role: 'Team',
        avatarColor: '#FF5722',
        profileImage: null,
        email: 'liam.chen@company.com',
        phone: '+1 (213) 555-0111',
        about: 'Interaction designer who brings interfaces to life with thoughtful motion and micro-interactions. Loves prototyping in code.',
        relationship: 'Liam reports to Alex Rivera',
        relationshipType: 'Team member'
    },
    {
        id: '8',
        initials: 'NR',
        name: 'Nina Rodriguez',
        title: 'Service Designer',
        location: 'Remote',
        tenure: '1.8y',
        experience: '6y',
        skills: ['Service Design', 'Workshop Facilitation', 'Ethnography', 'UX Strategy', 'User Research'],
        role: 'Senior Member',
        avatarColor: '#795548',
        profileImage: null,
        email: 'nina.rodriguez@company.com',
        phone: '+1 (555) 555-0112',
        about: 'Service designer who maps end-to-end experiences across touchpoints. Facilitates workshops that align teams around shared understanding.',
        relationship: 'Nina reports to Alex Rivera',
        relationshipType: 'Senior contributor'
    },
];
