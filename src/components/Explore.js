import React from "react";
import "../Styles/Explore.css";
import Product from "../components/common/Product";
import {plantData} from "../utilities/PlantData";

function Explore() {
    return (
        <div className="home">
            <div className="home__container">
                <div className='title__container'><br/><p>Plants</p></div>

                <div className="home__row">
                    { plantData
                        .map((plant, index) => {
                                if(plant.id<=3)
                                    return <Product item={plant}/>
                            }
                        )
                    }
                </div>

                <div className="home__row">
                    { plantData
                        .map((plant, index) => {
                                if(plant.id===4 || plant.id===5)
                                    return <Product item={plant}/>
                            }
                        )
                    }
                </div>

                <div className="home__row">
                    { plantData
                        .map((plant, index) => {
                                if(plant.id===6)
                                    return <Product item={plant}/>
                            }
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Explore;
