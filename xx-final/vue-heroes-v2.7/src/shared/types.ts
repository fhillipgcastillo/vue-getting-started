export interface Hero {
    id: number | undefined;
    fullName?: string;
    firstName: string;
    lastName: string;
    capeCounter: number;
    originDate: string;
    description: string;
};

export interface Villain {
    id: number;
    firstName: string;
    lastName: string;
    description: string;
};
