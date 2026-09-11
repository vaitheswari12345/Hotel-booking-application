


function Location({ location, setlocation }) {



    return(
        <>
        <label>Location</label>
        <select value={location}
        onChange={(e)=>setlocation(e.target.value)}>

            <option value="">Select Location</option>
                <option value="Chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Madurai">Madurai</option>
                <option value="Tiruchirappalli">Tiruchirappalli</option>
                <option value="Salem">Salem</option>
                <option value="Tirunelveli">Tirunelveli</option>
                <option value="Erode">Erode</option>
                <option value="Vellore">Vellore</option>
                <option value="Thoothukudi">Thoothukudi</option>
                <option value="Dindigul">Dindigul</option>
                <option value="Thanjavur">Thanjavur</option>
                <option value="Karur">Karur</option>
                <option value="Namakkal">Namakkal</option>
                <option value="Krishnagiri">Krishnagiri</option>
                <option value="Dharmapuri">Dharmapuri</option>
                <option value="Sivaganga">Sivaganga</option>
                <option value="Ramanathapuram">Ramanathapuram</option>
                <option value="Virudhunagar">Virudhunagar</option>
                <option value="Pudukkottai">Pudukkottai</option>
                <option value="Nagapattinam">Nagapattinam</option>
                <option value="Cuddalore">Cuddalore</option>
                <option value="Villupuram">Villupuram</option>
                <option value="Kallakurichi">Kallakurichi</option>
                <option value="Tiruvannamalai">Tiruvannamalai</option>
                <option value="Kanchipuram">Kanchipuram</option>
                <option value="Chengalpattu">Chengalpattu</option>
                <option value="Tiruvallur">Tiruvallur</option>
                <option value="Ranipet">Ranipet</option>
                <option value="Tenkasi">Tenkasi</option>
                <option value="Mayiladuthurai">Mayiladuthurai</option>
                <option value="Ariyalur">Ariyalur</option>
                <option value="Perambalur">Perambalur</option>
        </select>
        </>
    )
}
export default Location;