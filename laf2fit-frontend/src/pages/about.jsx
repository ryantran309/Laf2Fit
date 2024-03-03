import { Box, Text } from "@chakra-ui/react";
import { Navbar } from "../components";
import styled from "@emotion/styled";
import '../theme/about.css';

const about = () => {

  let message = `Welcome to LAF2FIT, your ultimate fitness companion! Our platform combines an AI-driven 
  virtual trainer, exercise tracking, a calorie counter, and community support to empower
  you on your journey towards a healthier and happier life. With LAF2FIT, you will stay
  motivated, monitor your progress, and achieve your fitness goals with confidence. 
  Join us today and transform your well-being!`;
  return (

    <section class="section-white">

      <div class="container">

        <div class="row">

          <div class="col-md-12 text-center">

            <h2 class="section-title">The team behind LAF2FIT</h2>

            <p class="section-subtitle">{message}</p>

          </div>

          <div class="col-sm-6 col-md-4">

            <div class="team-item">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src="../../public/assets/datnguyen.png" class="team-img" alt="pic" />
              </div>

              <h3>DAT NGUYEN</h3>
              <div class="team-info"><p>Project Leader</p></div>
              <p>Dat is the leader for our project. His task contains time management, writing reports.</p>

              <div class="team-icon">

                <span><a href="https://www.facebook.com/n.phtt" class="facebook">
                  <i class="fa fa-facebook"></i>
                </a></span>

              </div>

            </div>
          </div>

          <div class="col-sm-6 col-md-4">

            <div class="team-item">

              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src="../../public/assets/baotran.png" class="team-img" alt="pic" />
              </div>

              <h3>Bao Tran</h3>

              <div class="team-info"><p>Back-end Developer</p></div>

              <p>Bao developed our web application back-end through NodeJS, ExpressJS and MongoDB.</p>

              <div class="team-icon">

                <span><a href="https://www.facebook.com/pomme309420" class="facebook"><i class="fa fa-facebook"></i></a></span>

              </div>

            </div>

          </div>
          <div class="col-sm-6 col-md-4">

            <div class="team-item">

              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src="../../public/assets/dungle.png" class="team-img" alt="pic" />
              </div>

              <h3>DUNG LE</h3>

              <div class="team-info"><p>Back-end Developer</p></div>

              <p>Dung developed our Joint Detection through Python, OpenCV, MediaPipe and TensorFlow. </p>

              <div class="team-icon">


                <span><a href="https://www.facebook.com/anhdungle2001" class="facebook"><i class="fa fa-facebook"></i></a></span>

              </div>

            </div>

          </div>
          <div class="col-sm-6 col-md-4">

            <div class="team-item">

              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src="../../public/assets/nghiaaa.jpg" class="team-img" alt="pic" />
              </div>

              <h3>NGHIA NGUYEN</h3>

              <div class="team-info"><p>Front-end Developer</p></div>

              <p>Nghia built the Front-end for our web application, such as Login, About, and Calorie Intake page.</p>

              <div class="team-icon">


                <span><a href="https://www.facebook.com/katsuuhades/" class="facebook"><i class="fa fa-facebook"></i></a></span>


              </div>

            </div>

          </div>
          <div class="col-sm-6 col-md-4">

            <div class="team-item">

              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src="../../public/assets/khoadang.png" class="team-img" alt="pic" />
              </div>

              <h3>KHOA DANG</h3>

              <div class="team-info"><p>Front-end Developer</p></div>

              <p>Khoa developed the Register, Exercise Schedule, Home and Landing Page with CSS, Bootstrap.</p>

              <div class="team-icon">

                <span><a href="#" class="facebook"><i class="fa fa-facebook"></i></a></span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default about
