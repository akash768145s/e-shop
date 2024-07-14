import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { CartProductType } from "@/app/product/[productId]/ProductDetails";

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount:number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export const CartContextProvider = ({ children }: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount,setCartTotalAmount]=useState(0); 
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    
    console.log('qty',cartTotalQty)
    console.log("amount",cartTotalAmount)

    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartItems');
        const cProducts: CartProductType[] | null = JSON.parse(cartItems);
        setCartProducts(cProducts);
    }, []);
    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
                const { total, qty } = cartProducts?.reduce(
                    (acc, item) => {
                        const itemTotal = item.price * item.quantity;

                        acc.total += itemTotal;
                        acc.qty += item.quantity;

                        return acc;
                    },
                    {
                        total: 0,
                        qty: 0
                    }
                );
                setCartTotalQty(qty)
                setCartTotalAmount(total)
            }

        };
        getTotals()
    }, [cartProducts]);

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            const updatedCart = prev ? [...prev, product] : [product];
            toast.success("Product added to Cart");
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item) => item.id !== product.id);
            setCartProducts(filteredProducts);
            toast.success("Product Removed");
            localStorage.setItem("eShopCartItems", JSON.stringify(filteredProducts));
        }
    }, [cartProducts]);

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if (product.quantity === 99) {
            return toast.error("Ooop! Maximum Reached");
        }
        if (cartProducts) {
            updatedCart = [...cartProducts];
            if (cartProducts) {
                const existingIndex = cartProducts.findIndex((item) => item.id === product.id);
                if (existingIndex > -1) {
                    updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity
                }
                setCartProducts(updatedCart)
                localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
            }
        }
    }, [cartProducts]);


    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if (product.quantity === 1) {
            return toast.error("Ooop! Minimum Reached");
        }
        if (cartProducts) {
            updatedCart = [...cartProducts];
            if (cartProducts) {
                const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

                if (existingIndex > -1) {
                    updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity;
                }
                setCartProducts(updatedCart);
                localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
            }
        }
    }, [cartProducts]);


    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem("eShopCartItems", JSON.stringify(null));
    }, [cartProducts])

    const value: CartContextType = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,

    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider");
    }
    return context;
};
