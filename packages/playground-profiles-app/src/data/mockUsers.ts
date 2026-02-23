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
        profileImage: 'https://i.pravatar.cc/150?u=maya.chen'
    },
    {
        name: 'Liam Ortega',
        email: 'liam.ortega@company.com',
        initials: 'LO',
        profileImage: 'https://i.pravatar.cc/150?u=liam.ortega'
    },
    {
        name: 'Priya Nair',
        email: 'priya.nair@company.com',
        initials: 'PN',
        profileImage: 'https://i.pravatar.cc/150?u=priya.nair'
    },
    {
        name: 'Dylan Webb',
        email: 'dylan.webb@company.com',
        initials: 'DW',
        profileImage: 'https://i.pravatar.cc/150?u=dylan.webb'
    },
    {
        name: 'Nora Sato',
        email: 'nora.sato@company.com',
        initials: 'NS',
        profileImage: 'https://i.pravatar.cc/150?u=nora.sato'
    }
];

export const getRandomUser = (): UserData => {
    const randomIndex = Math.floor(Math.random() * mockUsers.length);
    return mockUsers[randomIndex];
};
