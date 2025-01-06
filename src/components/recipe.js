
import ReactMarkdown from "react-markdown";

export default function Recipe({ recipe }) {
    return (
      <section className="suggested-recipe-container">
        <h2>Suggested Recipe:</h2>
        <ReactMarkdown>{recipe}</ReactMarkdown>
      </section>
    );
    

}