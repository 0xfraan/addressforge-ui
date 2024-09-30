import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export const GetGolem = () => {
  return (
    <div>
      <Link
        href="https://glm.golem.network/"
        className="border-blue-500 flex space-x-2 text-blue-500 font-mono border bg-transparent hover:bg-blue-600 hover:border-blue-600 hover:text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        <ShoppingCart />
        <span>Get GLM</span>
      </Link>
    </div>
  );
};
