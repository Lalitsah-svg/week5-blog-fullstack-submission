function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <span className="eyebrow">ABOUT BRIEFLY</span>

        <h1>
          Stories for people
          <span> who stay curious.</span>
        </h1>

        <p>
          Briefly is a fictional editorial space created as a React
          frontend project. It brings together thoughtful stories about
          technology, design, products, and digital experiences.
        </p>
      </section>

      <section className="about-grid">
        <article>
          <span>01</span>
          <h2>Curiosity</h2>
          <p>
            We believe good ideas start with asking better questions and
            looking beyond the obvious.
          </p>
        </article>

        <article>
          <span>02</span>
          <h2>Clarity</h2>
          <p>
            Complex topics become more useful when they are explained
            clearly and thoughtfully.
          </p>
        </article>

        <article>
          <span>03</span>
          <h2>Craft</h2>
          <p>
            Every story and every interface should respect the reader's
            time and attention.
          </p>
        </article>
      </section>
    </main>
  );
}

export default About;