export interface Hero {
    id: string | undefined;
    fullName?: string;
    firstName: string;
    lastName: string;
    capeCounter: number;
    originDate: string;
    description: string;
};

export interface Villain {
    id: string | undefined;
    firstName: string;
    lastName: string;
    description: string;
};
