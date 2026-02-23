import ProductCard from "./productCard";

export default function TrendingProducts(){
    return(
        <div>
            <h1>Trending Products</h1>
            <ProductCard name="Macbook Air" price="150,000" image="https://picsum.photos/id/1/200/300" />
            <ProductCard name="iPhone 15 Pro" price="65,000" image="https://picsum.photos/id/3/200/300" />
            <ProductCard name="iPad Air" price="45,000" image="https://picsum.photos/id/4/200/300" />
            <ProductCard name="iPhone 15 Pro Air" price="45,000" image="https://picsum.photos/id/3/200/300" />
        </div>
    )
}