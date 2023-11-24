export interface Recipe {
    _id: string;
    name: string;
    description: string;
    imagePath: string;
    ingredients: [
        {
            name: string;
            amount: number;
        }
    ]
}