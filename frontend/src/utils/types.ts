//SignUp/Login onClick
type AuthProps = {
    toggleAuthMode: () => void;
}

//Product types
type Product = {
    id: string
    title: string
    description: string
    price: number
    category: string
    image: string
    rating: {
      rate: number
      count: number
    }
}

type User = {
    name: string;
    email: string;
    password: string;
    role: "customer" | "admin";
    address?: string;
    phone?: string;
    cart: string | null;
    orders: string | null;
    wishlist: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export { type AuthProps, type Product, type User };
