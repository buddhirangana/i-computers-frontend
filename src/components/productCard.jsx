export default function ProductCard(props){
    return(
        <div className="bg-[#319631] border border-green-900 w-[319px] text-white">
          <h1 className="text-[#87CEEB] text-[30px]">{props.name}</h1>
          <img src={props.image} alt={"Picture of a " + props.name} />
          <p>LKR {props.price}</p>
          <button>Buy Now</button>
        </div>
    )
}