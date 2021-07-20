const url = "https://formspree.io/f/mleoqwog";

export default function Contact() {
  return (
    <div className="container">
      <h1>We appreciate your feedback!</h1>
      <p>
        Feel free to drop us a line if you have any comments or suggestions
        regarding the app.
      </p>
      <form action={url} method="POST">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            class="form-control"
            id="exampleFormControlInput1"
            type="email"
            name="_replyto"
            placeholder="name@example.com"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">
            Your message:
          </label>
          <textarea
            name="message"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"></textarea>
        </div>
        <button className="btn btn-dark mb-3" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
