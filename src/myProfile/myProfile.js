import React from 'react';
import './myProfile.css';
import Navbar from "../navbar/navbar";


const myProfile = () =>{
    return (
        <container>
            <Navbar/>
            <div>
                <div style={{
                 display:"flex",
                 justifyContent: "space",
                 margin:"18px 0px",
                  borderBottom:"1px solid grey"
                }}>
                    <div>
                        <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                         src="https://images.unsplash.com/photo-1546109113-a07e6a96ef76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80"
                        />
                    </div>
                    <div>
                        <h4>Name Here</h4>
                        <div style={{
                            display:"flex",
                            justifyContent:"space-between",
                            width:"110%"
                         }}>
                        <h5>username here</h5>
                        <h5>email</h5>
                        </div>
                    </div>
                </div>
                </div>
        </container>
    )
}

export default myProfile
