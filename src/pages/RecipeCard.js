const RecipeCard = (props) => {
  return (
    <div className="recipe-card">
      <h4 className="recipe-card__title">{ props.recipe?.name }</h4>
      <h5 className="recipe-card__author" style={{ fontStyle: "italic" }}>par { props.recipe?.author }</h5>
      <p className="recipe-card__ingredients"><b>Ingrédients :</b> { props.recipe?.ingredients }</p>
      <p className="recipe-card__steps">{ props.recipe?.steps }</p>
    </div>
  );
};

export default RecipeCard;