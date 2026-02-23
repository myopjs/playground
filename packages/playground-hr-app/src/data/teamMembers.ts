export type TeamMember =  {
    id: string;
    initials: string;
    name: string;
    title: string;
    location: string;
    tenure: string;
    experience: string;
    skills: string[];
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
        skills: ['Design Leadership', 'Strategy', 'Team Management'],
        role: 'Manager',
        avatarColor: '#9B59B6',
        profileImage: null,
        email: 'alex.rivera@company.com',
        phone: '+1 (415) 555-0101',
        about: 'Passionate design leader with over a decade of experience building and scaling design teams. Focused on creating user-centered products that drive business impact.',
        relationship: 'Alex leads the design team',
        relationshipType: 'Team lead'
    },
    {
        id: '2',
        initials: 'JP',
        name: 'Jamie Park',
        title: 'Product Designer',
        location: 'Seattle, WA',
        tenure: '1.5y',
        experience: '3y',
        skills: ['UI Design', 'Mobile Design', 'Prototyping'],
        role: 'Team',
        avatarColor: '#3498DB',
        profileImage: null,
        email: 'jamie.park@company.com',
        phone: '+1 (206) 555-0102',
        about: 'Creative product designer specializing in mobile experiences. Love turning complex problems into simple, intuitive interfaces.',
        relationship: 'Jamie reports to Alex Rivera',
        relationshipType: 'Team member'
    },
    {
        id: '3',
        initials: 'SF',
        name: 'Sam Foster',
        title: 'UX Researcher',
        location: 'Austin, TX',
        tenure: '2.1y',
        experience: '4y',
        skills: ['User Research', 'Data Analysis', 'Usability Testing'],
        role: 'Team',
        avatarColor: '#1ABC9C',
        profileImage: null,
        email: 'sam.foster@company.com',
        phone: '+1 (512) 555-0103',
        about: 'Data-driven UX researcher dedicated to understanding user behavior. Combines qualitative and quantitative methods to uncover actionable insights.',
        relationship: 'Sam reports to Alex Rivera',
        relationshipType: 'Team member'
    },
    {
        id: '4',
        initials: 'RK',
        name: 'Riley Kim',
        title: 'Senior Product Designer',
        location: 'New York, NY',
        tenure: '3.5y',
        experience: '7y',
        skills: ['Product Design', 'Design Systems', 'Accessibility'],
        role: 'Senior Member',
        avatarColor: '#E74C3C',
        profileImage: null,
        email: 'riley.kim@company.com',
        phone: '+1 (212) 555-0104',
        about: 'Senior designer passionate about design systems and accessibility. Believes great design should be inclusive and scalable.',
        relationship: 'Riley is a senior team member',
        relationshipType: 'Senior contributor'
    },
    {
        id: '5',
        initials: 'TB',
        name: 'Taylor Brooks',
        title: 'Senior UX Designer',
        location: 'Remote',
        tenure: '2.3y',
        experience: '5.5y',
        skills: ['UX Design', 'Information Architecture', 'Wireframing'],
        role: 'Senior Member',
        avatarColor: '#F39C12',
        profileImage: null,
        email: 'taylor.brooks@company.com',
        phone: '+1 (555) 555-0105',
        about: 'Remote-first UX designer focused on information architecture and user flows. Expert at structuring complex applications for clarity.',
        relationship: 'Taylor is a senior team member',
        relationshipType: 'Senior contributor'
    },
];
