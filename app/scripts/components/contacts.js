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
                //this.setState({isError: true});
                Materialize.toast('Something goes wrong :( Please try again or later.', 4000)
            } else {
                //this.setState({isSend: true});
                Materialize.toast('Cool! Thanks for your message!', 4000)
            }
        });
    }

    render() {
        let isDisabled = this.state.isDisabled;
        let isSend = this.state.isSend;
        let isError = this.state.isError;

        return (
            <div className="row">
                <div className="col l12 s12">
                    <h5>Contacts</h5>
                    <p>Feel free to send your opinion about the app. Or maybe you notice some bugs or have an idea how
                        to make this app better, let Us know :)</p>
                    <form className="contacts-form" action="">
                        <div className="row">
                            <div className="input-field col s6">
                                <input onKeyPress={this.enterData} className="validate name" name="name" type="text" id="name" ref="name" required/>
                                <label for="name">Your Name...</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input onKeyPress={this.enterData} className="validate email" name="email" type="email" id="email" ref="email" required/>
                                <label for="email">example@site.com</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s8">
                                <textarea onKeyPress={this.enterData} className="materialize-textarea validate" type="text" rows="3" id="message" ref="message" required></textarea>
                                <label for="message">Your message goes here...</label>
                            </div>
                        </div>
                        <div className="row">
                            <a className={isDisabled === true ? 'waves-effect waves-light btn disabled' : 'waves-effect waves-light btn'} onClick={this.sendMessage}>Send</a>
                        </div>
                        <div className="row">
                            <p className={isSend === true ? 'success-message' : 'success-message-hide'}>Cool! Thanks for your message!</p>
                            <p className={isError === true ? 'error-message' : 'error-message-hide'}>Something goes wrong :( Please try again or later.</p>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}