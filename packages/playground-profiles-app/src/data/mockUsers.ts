export type UserData = {
    name: string;
    email: string;
    initials: string;
    profileImage: string | null;
}

export const mockUsers: UserData[] = [
    {
        name: 'Maya Chen',
        email: 'maya.chen@company.com',
        initials: 'MC',
        profileImage: null
    },
    {
        name: 'Liam Ortega',
        email: 'liam.ortega@company.com',
        initials: 'LO',
        profileImage: null
    },
    {
        name: 'Priya Nair',
        email: 'priya.nair@company.com',
        initials: 'PN',
        profileImage: null
    },
    {
        name: 'Dylan Webb',
        email: 'dylan.webb@company.com',
        initials: 'DW',
        profileImage: null
    },
    {
        name: 'Nora Sato',
        email: 'nora.sato@company.com',
        initials: 'NS',
        profileImage: null
    }
];

export const getRandomUser = (): UserData => {
    const randomIndex = Math.floor(Math.random() * mockUsers.length);
    return mockUsers[randomIndex];
};
