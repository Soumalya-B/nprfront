import React from "react";
import { Puff } from 'react-loader-spinner'

export default function LoadingSpinner() {
    return (
        // id="cover-spin"
        <section className="full_width membership">
            <div className="container">
                <div className="row justify-content-md-center mb-3">
                    <div className="col-md-auto" >
                        <Puff  color="#1b1464" />
                    </div>
                </div>
            </div>
        </section>
    );
}