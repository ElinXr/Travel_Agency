import CKEditor from 'ckeditor4';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    };
  }

  componentDidMount() {
    const editor = CKEditor.replace('editor');

    editor.on('change', () => {
      this.setState({
        content: editor.getData()
      });
    });
  }

  render() {
    return (
      <div>
        <textarea id="editor"></textarea>
        <button onClick={() => this.props.onSave(this.state.content)}>Запази</button>
      </div>
    );
  }
}

export default Editor;
