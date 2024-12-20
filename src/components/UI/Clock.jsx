import React, {useState, useEffect} from "react";

import "../../styles/clock.css";

const Clock = ( ) => {

    const [days, setDays] = useState()
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState()

    let interval;

    const countDown = ( ) => {

        // sa may timer part itong functionality na 'to
        //naka set sa dec 25 dahil hanggang dec yung product sale just for example 
        const destination = new Date('Dec 25, 2024').getTime()

        interval = setInterval ( () => {

            const now = new Date().getTime()
            const different = destination - now
            const days = Math.floor(different / (1000 * 60 * 60 * 24))

            const hours = Math.floor(different % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))

            const minutes = Math.floor(different % (1000 * 60 * 60) / (1000 * 60))

            const seconds = Math.floor(different % (1000 * 60 ) / 1000 )

            if(destination < 0) clearInterval(interval.current)

                else {
                    setDays(days)
                    setHours(hours)
                    setMinutes(minutes)
                    setSeconds(seconds)
                }
        });
    };

    useEffect ( () =>{
        countDown()
    })

    return (
        <div className="clock__wrapper d-flex align-items-center gap-3">
            <div className="clock__data d-flex align-items-center gap-3">
                <div className="text-center">
                    <h1 className="fs-3 mb-2">{days} </h1>
                    <h5 className="fs-6">Days</h5>
                </div>
                <span className="fs-3">:</span>
            </div>

            <div className="clock__data d-flex align-items-center gap-3">
                <div className="text-center">
                    <h1 className="fs-3 mb-2">{hours} </h1>
                    <h5 className="fs-6">Hours</h5>
                </div>
                <span className="fs-3">:</span>
            </div>

            <div className="clock__data d-flex align-items-center gap-3">
                <div className="text-center">
                    <h1 className="fs-3 mb-2">{minutes} </h1>
                    <h5 className="fs-6">Minutes</h5>
                </div>
                <span className="fs-3">:</span>
            </div>

            <div className="clock__data d-flex align-items-center gap-3">
                <div className="text-center">
                    <h1 className="fs-3 mb-2">{seconds} </h1>
                    <h5 className="fs-6">Seconds</h5>
                </div>
            </div>

            
        </div>


    );
};

export default Clock;