import React from "react";

import './LandingBody.css'

function LandingBody() {
    function snowflakes() {
        let canvas = document.getElementById("snowfallBackground")
        let ctx = canvas.getContext("2d")

        canvas.width = '800'
        canvas.height = '800'

        // Define the wind direction and strength
        let wind = {
            x: Math.random(), // wind blows in the x-direction
            y: Math.random(), // wind blows in the y-direction
            strength: Math.random() * Math.random() // wind strength is 0.5
        }

        // Create an array to hold the snowflakes
        let snowflakes = []

        // Define a Snowflake class
        function Snowflake() {
            this.x = Math.random() * canvas.width // initial x position
            this.y = Math.random() * canvas.height // initial y position
            this.radius = Math.random() * 2 // snowflake radius
            this.drift = Math.random() * wind.strength * 2 // how much snowflake drifts
        }

        // Add a "move" method to the Snowflake prototype
        Snowflake.prototype.move = function() {
            // Update the snowflake's position
            this.x += wind.strength + this.drift
            this.y += wind.strength + this.drift

            // If the snowflake has moved off the canvas, reset its position
            if (this.y > canvas.height) {
                this.y = 0;
            }
            if (this.x > canvas.height) {
                this.x = 0
            }
        }

        // Add a "draw" method to the Snowflake prototype
        Snowflake.prototype.draw = function() {
            // Draw the snowflake on the canvas
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
            ctx.fillStyle = "white"
            ctx.fill()
            ctx.closePath()
        }

        // Initialize the snowflakes
        for (let i = 0; i < 230; i++) {
            snowflakes.push(new Snowflake())
        }

        // Animate the snowflakes
        function animate() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Move and draw each snowflake
            for (let i = 0; i < snowflakes.length; i++) {
                snowflakes[i].move()
                snowflakes[i].draw()
            }

            // Request another animation frame
            requestAnimationFrame(animate)
        }

        // Start the animation
        animate()
    }

    return (
        <div className="landingBodyContainer">
            <canvas id="snowfallBackground" onClick={snowflakes}></canvas>
        </div>
    )
}

export default LandingBody
