import { useEffect, useRef } from "react";
import "./css/HomePage.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const HomePage = () => {
  const { isLoggedIn } = useAppContext();
  // Create refs for each section
  const sectionRef1 = useRef<HTMLDivElement>(null);
  const sectionRef2 = useRef<HTMLDivElement>(null);
  const sectionRef3 = useRef<HTMLDivElement>(null);
  const sectionRef4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef1.current) {
      observer.observe(sectionRef1.current);
    }

    if (sectionRef2.current) {
      observer.observe(sectionRef2.current);
    }
    if (sectionRef3.current) {
      observer.observe(sectionRef3.current);
    }
    if (sectionRef4.current) {
      observer.observe(sectionRef4.current);
    }

    return () => {
      if (sectionRef1.current) {
        observer.unobserve(sectionRef1.current);
      }

      if (sectionRef2.current) {
        observer.unobserve(sectionRef2.current);
      }
      if (sectionRef3.current) {
        observer.unobserve(sectionRef3.current);
      }
      if (sectionRef4.current) {
        observer.unobserve(sectionRef4.current);
      }
    };
  }, []);

  return (
    <body>
      <h1>fitness_log</h1>

      <section className="fly-in-section" ref={sectionRef1}>
        <h1 className="section-title">Hi</h1>
        <p className="section-description">
          This is my website-it's a simple to use and lightweight web
          application that allows you to easily and conveniently track your
          workouts, all with the help of LLM's guiding you through your next
          workout.
        </p>
      </section>

      <section className="fly-in-section" ref={sectionRef2}>
        <h2>Use my website!</h2>
        <p>It's really cool I promise.</p>
      </section>

      <section className="fly-in-section" ref={sectionRef3}>
        <h1 className="section-title">Log and Chat</h1>
        <div className="content-grid">
          <p className="section-description">
            Chat with an LLM on the click of a button.
          </p>
          <p className="section-description">
            Gamify your fitness journey with a progress tracker.
          </p>
          <p className="section-description">
            Customized to your personal profile and workouts, why not flex and
            tailor your workouts to you.
          </p>
        </div>
      </section>

      <section className="fly-in-section" ref={sectionRef4}>
        <h1 className="section-title">Up your Fitness</h1>
        <div className="content-grid">
          <p className="section-description">
            Let fitness join the other upward trends in your life.
          </p>
          <p className="section-description">Let's go.</p>
          {isLoggedIn ? (
            <button className="cta-button">Join Now</button>
          ) : (
            <Link to="/register" className="cta-button">
              Join now
            </Link>
          )}
        </div>
      </section>
    </body>
  );
};

export default HomePage;
