
function HotelCard(props){

    return(
        <>
        <h1>{props.Name}</h1>
        <p>Location:{props.Location}</p>
        <p>Price:{props.Price}</p>
        <p>Rating:{props.Rating}</p>
        </>
    )
}
export default HotelCard;