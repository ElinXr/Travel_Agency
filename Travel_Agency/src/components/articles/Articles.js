import Editor from '../editor/Editor';

class Articles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles = () => {
    // ... код за извличане на статии от API и записване в state
  };

  addArticle = (content) => {
    // ... код за добавяне на статия към API и актуализиране на state
  };

  editArticle = (id, content) => {
    // ... код за редактиране на статия в API и актуализиране на state
  };

  deleteArticle = (id) => {
    // ... код за изтриване на статия от API и актуализиране на state
  };

  render() {
    return (
      <div>
        {this.state.articles.map((article) => (
          <div key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <button onClick={() => this.editArticle(article.id)}>Редактиране</button>
            <button onClick={() => this.deleteArticle(article.id)}>Изтриване</button>
          </div>
        ))}
        <Editor onSave={this.addArticle} />
      </div>
    );
  }
}

export default Articles;
