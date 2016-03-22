export default class Contacts extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            message: '',
            email: '',
            name: '',
            isDisabled: true
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.enterData = this.enterData.bind(this);
    }

    enterData(){
        let data = {};

        data.name = ReactDOM.findDOMNode(this.refs.name).value;
        data.email = ReactDOM.findDOMNode(this.refs.email).value;
        data.message = ReactDOM.findDOMNode(this.refs.message).value;

        if(data.name !== '' && data.message !== '' && data.email.match(/^.+@.+\..+$/)) this.setState({isDisabled: false});
    }

    sendMessage(){
        
    }

    render() {
        let isDisabled = this.state.isDisabled;

        return (
            <div className="mdl-grid contacts-page">
                <div className="mdl-cell mdl-cell--1-col"></div>
                <div className="mdl-cell mdl-cell--8-col">
                    <h5>Contacts</h5>
                    <p>Feel free to send your opinion about the app. Or maybe you notice some bugs or have an idea how
                        to make this app better, let Us know :)</p>
                    <form className="contacts-form" action="">
                        <div className="mdl-textfield mdl-js-textfield">
                            <input onKeyPress={this.enterData} className="mdl-textfield__input name" name="name" type="text" id="name" ref="name" required/>
                            <label className="mdl-textfield__label" for="name">Your Name...</label>
                        </div>
                        <div className="mdl-textfield mdl-js-textfield">
                            <input onKeyPress={this.enterData} className="mdl-textfield__input email" name="email" type="email" id="email" ref="email" required/>
                            <label className="mdl-textfield__label" for="email">example@site.com</label>
                        </div>
                        <div className="mdl-textfield mdl-js-textfield">
                            <textarea onKeyPress={this.enterData} className="mdl-textfield__input" type="text" rows="3" id="message" ref="message" required></textarea>
                            <label className="mdl-textfield__label" for="message">Your message goes here...</label>
                        </div>
                        <button disabled={isDisabled} onClick={this.sendMessage} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored send-message">
                            Send message
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}