import {fireBase} from '../configs.js';

export default class Contacts extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: {
                message: '',
                email: '',
                name: ''
            },
            isDisabled: true,
            isSend: false,
            isError: false
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.enterData = this.enterData.bind(this);
    }

    enterData(){
        let data = {};

        data.name = ReactDOM.findDOMNode(this.refs.name).value;
        data.email = ReactDOM.findDOMNode(this.refs.email).value;
        data.message = ReactDOM.findDOMNode(this.refs.message).value;

        if(data.name !== '' && data.message !== '' && data.email.match(/^.+@.+\..+$/)) {
            this.setState({isDisabled: false});
            this.setState({data: data});
        }
    }

    sendMessage(e) {
        e.preventDefault();
        fireBase.set({userMessage: this.state.data}, (error)=> {
            if (error) {
                this.setState({isError: true});
            } else {
                this.setState({isSend: true});
            }
        });
    }

    render() {
        let isDisabled = this.state.isDisabled;
        let isSend = this.state.isSend;
        let isError = this.state.isError;

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
                        <div className={isSend === true ? 'mdl-grid success-message' : 'success-message-hide'}>
                            Cool! Thanks for your message!
                        </div>
                        <div className={isError === true ? 'mdl-grid error-message' : 'error-message-hide'}>
                            Something goes wrong :( Please try again or later.
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}