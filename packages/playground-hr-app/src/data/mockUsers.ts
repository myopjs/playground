export type UserData = {
    name: string;
    email: string;
    initials: string;
    profileImage: string | null;
}

export const mockUsers: UserData[] = [
    {
        name: 'Morgan Chase',
        email: 'morgan.chase@company.com',
        initials: 'MC',
        profileImage: 'https://i.pravatar.cc/150?u=morgan.chase'
    },
    {
        name: 'Dana Whitfield',
        email: 'dana.whitfield@company.com',
        initials: 'DW',
        profileImage: 'https://i.pravatar.cc/150?u=dana.whitfield'
    },
    {
        name: 'Casey Nguyen',
        email: 'casey.nguyen@company.com',
        initials: 'CN',
        profileImage: 'https://i.pravatar.cc/150?u=casey.nguyen'
    },
    {
        name: 'Jordan Ellis',
        email: 'jordan.ellis@company.com',
        initials: 'JE',
        profileImage: 'https://i.pravatar.cc/150?u=jordan.ellis'
    },
    {
        name: 'Avery Lawson',
        email: 'avery.lawson@company.com',
        initials: 'AL',
        profileImage: 'https://i.pravatar.cc/150?u=avery.lawson'
    }
];

export const getRandomUser = (): UserData => {
    const randomIndex = Math.floor(Math.random() * mockUsers.length);
    return mockUsers[randomIndex];
};
